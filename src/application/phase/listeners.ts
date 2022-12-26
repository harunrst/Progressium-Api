import * as ApplicationConstants from "../constants";
import { Phase } from "../../domain/phase/phase";
import { DbContext } from "../../persistence/dbContext";
import { EventBus } from "../../persistence/eventBus";

/**
 * Initializes event listeners for phase operations
 */
export const initializePhaseListeners = () => {
  EventBus.listen(
    ApplicationConstants.EventNames.PhaseTasksUpdated,
    (args: any[]) => {
      const phaseId = args[0];
      let phase: Phase = DbContext.find<Phase>(phaseId).getInstance();

      //if a phase is done, unlock next phase
      if (phase.isDone) {
        let nextPhase: Phase = DbContext.find<Phase>(
          phase.nextPhase
        ).getInstance();
        nextPhase.unlock();
        DbContext.update<Phase>(nextPhase.name, nextPhase);

        //in case that when multiple phases are unlocked, if one of the tasks in a previous phase undo
        //we lock all next phases with current states
        //this traverse below, unlock all next phases when they are in done state
        traversePhases(nextPhase, (upNextPhase: Phase) => {
          if (nextPhase.isDone) {
            upNextPhase.unlock();
            DbContext.update<Phase>(upNextPhase.name, upNextPhase);
          } else {
            return;
          }
        });
      }

      //if a phase becomes undo position, lock all next phases with current states they have
      if (!phase.isDone) {
        traversePhases(phase, (nextPhase: Phase) => {
          nextPhase.lock();
          DbContext.update<Phase>(nextPhase.name, nextPhase);
        });
      }
    }
  );
};

const traversePhases = (phase: Phase, callback: Function) => {
  while (phase.nextPhase) {
    const nextPhase: Phase = DbContext.find<Phase>(
      phase.nextPhase
    ).getInstance();

    callback(nextPhase);

    phase = nextPhase;
  }
};
