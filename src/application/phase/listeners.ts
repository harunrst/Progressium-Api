import * as ApplicationConstants from "../constants";
import { Phase } from "../../domain/phase/phase";
import { DbContext } from "../../persistence/dbContext";
import { EventBus } from "../../persistence/eventBus";

export const PhaseCompletionListeners = () => {
  EventBus.listen(
    ApplicationConstants.EventNames.PhaseTasksUpdated,
    (args: any[]) => {
      const phaseId = args[0];
      let phase: Phase = DbContext.find<Phase>(phaseId).getInstance();

      if (phase.isDone) {
        const nextPhase: Phase = DbContext.find<Phase>(
          phase.nextPhase
        ).getInstance();
        nextPhase.unlock();
        DbContext.update<Phase>(nextPhase.name, nextPhase);
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
