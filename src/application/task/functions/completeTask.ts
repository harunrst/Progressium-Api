import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { isValidPhase } from "../../utils";
import { emitPhaseTasksUpdated } from "../emitters";
import * as PhaseConstants from "../../../domain/phase/constants";

/**
 * Complete a task
 * @params {string} phaseId: Related phase id/name
 * @params {string} taskId: Task to complete
 */
const completeTask = (phaseId: string, taskId: string): void => {
  if (!isValidPhase(phaseId)) {
    throw new Error(PhaseConstants.Validations.InvalidPhaseName);
  }
  const phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
  phase.completeTask(taskId);
  DbContext.update(phaseId, phase);
  emitPhaseTasksUpdated(phaseId);
};
export default completeTask;
