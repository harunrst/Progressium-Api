import { IEventBus } from "../../common/interfaces/IEventBus";
import { InMemoryEventBus } from "../../persistence/eventBus";
import * as PhaseConstants from "../../domain/phase/constants";

export const PhaseCompletionListener = () => {
  const eventBus = InMemoryEventBus.getInstance() as IEventBus;

  eventBus.listen(
    PhaseConstants.EventNames.PhaseCompleted,
    (phaseId: string, isDone: boolean) => {
      console.log(phaseId, isDone);
    }
  );

  eventBus.listen(
    PhaseConstants.EventNames.PhaseUncompleted,
    (phaseId: string, isDone: boolean) => {
      console.log(phaseId, isDone);
    }
  );
};
