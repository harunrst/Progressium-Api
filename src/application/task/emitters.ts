import { EventBus } from "../../persistence/eventBus";
import * as ApplicationConstants from "../constants";

/**
 * Emit an event to inform phases about task updates
 * @params {string} phaseId: Related phase id/name
 */
export const emitPhaseTasksUpdated = (phaseId: string) => {
  EventBus.emit(ApplicationConstants.EventNames.PhaseTasksUpdated, phaseId);
};
