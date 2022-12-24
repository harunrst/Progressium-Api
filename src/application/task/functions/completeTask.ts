import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { emitPhaseTasksUpdated } from "../emitters";

const completeTask = (phaseId: string, taskId: string): void => {
  const phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
  phase.completeTask(taskId);
  DbContext.update(phaseId, phase);
  emitPhaseTasksUpdated(phaseId);
};
export default completeTask;
