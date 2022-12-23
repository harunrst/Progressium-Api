import { InMemoryCache } from "../../persistence/InMemoryCache";
import { ICache } from "../../common/interfaces/ICache";
import { Task } from "../../domain/task/task";
import { Phase } from "../../domain/phase/phase";

const addTask = (phaseId: string, description: string): void => {
  const cache = InMemoryCache.getInstance() as ICache;
  var phase: Phase = cache.getItem<Phase>(phaseId).getInstance();
  const task = new Task(description);
  phase.addTask(task);
  cache.setItem(phaseId, phase);
};
export default addTask;
