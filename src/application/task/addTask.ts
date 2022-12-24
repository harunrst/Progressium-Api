import { Task } from "../../domain/task/task";
import { Phase } from "../../domain/phase/phase";
import { DbContext } from "../../persistence/dbContext";

const addTask = (phaseId: string, description: string): void => {
  var phase: Phase = DbContext.find<Phase>(phaseId).getInstance();
  const task = new Task(description);
  phase.addTask(task);
  DbContext.update<Phase>(phaseId, phase);
};
export default addTask;
