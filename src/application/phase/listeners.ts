import { IEventBus } from "../../common/interfaces/IEventBus";
import { InMemoryEventBus } from "../../persistence/eventBus";
import * as PhaseConstants from "../../domain/phase/constants";
import { InMemoryCache } from "../../persistence/InMemoryCache";
import { ICache } from "../../common/interfaces/ICache";
import { Phase } from "../../domain/phase/phase";

export const PhaseCompletionListener = () => {
  const eventBus = InMemoryEventBus.getInstance() as IEventBus;
  const cache = InMemoryCache.getInstance() as ICache;

  eventBus.listen(PhaseConstants.EventNames.PhaseCompleted, (args: any[]) => {
    const phaseId = args[0];
    var phase: Phase = cache.getItem<Phase>(phaseId).getInstance();
    var nextPhase: Phase = cache.getItem<Phase>(phase.nextPhase).getInstance();
    nextPhase.unlock();
    cache.setItem(nextPhase.name, nextPhase);
  });

  eventBus.listen(
    PhaseConstants.EventNames.PhaseUncompleted,
    (phaseId: string) => {}
  );
};
