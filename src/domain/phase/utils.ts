import { IEventBus } from "../../common/interfaces/IEventBus";
import { InMemoryEventBus } from "../../persistence/eventBus";
import * as PhaseConstants from "./constants";

export const emitPhaseCompleted = (name: string) => {
  const eventBus = InMemoryEventBus.getInstance() as IEventBus;
  eventBus.emit(PhaseConstants.EventNames.PhaseCompleted, name);
};
export const emitPhaseUncompleted = (name: string) => {
  const eventBus = InMemoryEventBus.getInstance() as IEventBus;
  eventBus.emit(PhaseConstants.EventNames.PhaseUncompleted, name);
};
