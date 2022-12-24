import { IEventBus } from "../../common/interfaces/IEventBus";
import { InMemoryEventBus } from "../../persistence/inMemoryEventBus";
import * as ApplicationConstants from "../constants";

export const emitPhaseTasksUpdated = (phaseName: string) => {
  const eventBus = InMemoryEventBus.getInstance() as IEventBus;
  eventBus.emit(ApplicationConstants.EventNames.PhaseTasksUpdated, phaseName);
};
