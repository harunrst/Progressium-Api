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

      if (phase.isDone) {
        let nextPhase: Phase = DbContext.find<Phase>(
          phase.nextPhase
        ).getInstance();
        nextPhase.unlock();
        DbContext.update<Phase>(nextPhase.name, nextPhase);

        while (nextPhase.nextPhase) {
          let phaseTr: Phase = DbContext.find<Phase>(
            nextPhase.nextPhase
          ).getInstance();
          if (nextPhase.isDone) {
            phaseTr.unlock();
            DbContext.update<Phase>(phaseTr.name, phaseTr);
          } else {
            break;
          }
          nextPhase = phaseTr;
        }
      }

      if (!phase.isDone) {
        while (phase.nextPhase) {
          const nextPhase: Phase = DbContext.find<Phase>(
            phase.nextPhase
          ).getInstance();
          nextPhase.lock();
          DbContext.update<Phase>(nextPhase.name, nextPhase);
          phase = nextPhase;
        }
      }
    }
  );
};
