import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { isValidPhase } from "../../utils";
import { emitPhaseTasksUpdated } from "../emitters";
import * as PhaseConstants from "../../../domain/phase/constants";

/**
 * Undo a task
 * @params {string} phaseId: Related phase id/name
 * @params {string} taskId: Task to undo
 */
const undoTask = (phaseId: string, taskId: string): void => {
  if (!isValidPhase(phaseId)) {
    throw new Error(PhaseConstants.Validations.InvalidPhaseName);
  }
  const phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
  phase.undoTask(taskId);
  DbContext.update(phaseId, phase);
  emitPhaseTasksUpdated(phaseId);
};
export default undoTask;
