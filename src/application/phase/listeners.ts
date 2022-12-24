import { IEventBus } from "../../common/interfaces/IEventBus";
import { InMemoryEventBus } from "../../persistence/inMemoryEventBus";
import * as PhaseConstants from "../../domain/phase/constants";
import { Phase } from "../../domain/phase/phase";
import { DbContext } from "../../persistence/dbContext";

export const PhaseCompletionListeners = () => {
  const eventBus = InMemoryEventBus.getInstance() as IEventBus;

  eventBus.listen(PhaseConstants.EventNames.PhaseCompleted, (args: any[]) => {
    const phaseId = args[0];
    const phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
    const nextPhase: Phase = DbContext.find<Phase>(
      phase.nextPhase
    ).getInstance();
    nextPhase.unlock();
    DbContext.update<Phase>(nextPhase.name, nextPhase);
  });

  eventBus.listen(PhaseConstants.EventNames.PhaseUncompleted, (args: any[]) => {
    const phaseId = args[0];
    var phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
    while (!!phase.nextPhase) {
      const nextPhase: Phase = DbContext.find<Phase>(
        phase.nextPhase
      ).getInstance();
      nextPhase.lock();
      DbContext.update<Phase>(nextPhase.name, nextPhase);
      phase = nextPhase;
    }
  });
};
