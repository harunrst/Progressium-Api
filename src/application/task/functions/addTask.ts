import { Task } from "../../../domain/task/task";
import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { emitPhaseTasksUpdated } from "../emitters";
import { isValidPhase } from "../../utils";
import * as PhaseConstants from "../../../domain/phase/constants";

/**
 * Add task to given phase
 * @params {string} phaseId: Related phase id/name
 * @params {string} description: Task description
 */
const addTask = (phaseId: string, description: string): string => {
  if (!isValidPhase(phaseId)) {
    throw new Error(PhaseConstants.Validations.InvalidPhaseName);
  }
  const phase: Phase = DbContext.find<Phase>(phaseId)?.getInstance();
  if (!phase) {
    throw new Error(PhaseConstants.Validations.PhaseNotFound);
  }
  const task = new Task(description);
  const taskId = phase.addTask(task);
  DbContext.update<Phase>(phaseId, phase);
  emitPhaseTasksUpdated(phaseId);
  return taskId;
};
export default addTask;
