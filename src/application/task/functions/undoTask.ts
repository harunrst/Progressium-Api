import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { emitPhaseTasksUpdated } from "../emitters";

const undoTask = (phaseId: string, taskId: string): void => {
  const phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
  phase.undoTask(taskId);
  DbContext.update(phaseId, phase);
  emitPhaseTasksUpdated(phaseId);
};
export default undoTask;
