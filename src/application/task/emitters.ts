import { EventBus } from "../../persistence/eventBus";
import * as ApplicationConstants from "../constants";

export const emitPhaseTasksUpdated = (phaseName: string) => {
  EventBus.emit(ApplicationConstants.EventNames.PhaseTasksUpdated, phaseName);
};
