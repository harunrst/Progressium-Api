import { Phase } from "../../domain/phase/phase";
import { DbContext } from "../../persistence/dbContext";

const completeTask = (phaseId: string, taskId: string): void => {
  var phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
  phase.completeTask(taskId);
  DbContext.update(phaseId, phase);
};
export default completeTask;
