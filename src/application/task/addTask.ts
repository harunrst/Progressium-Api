import { InMemoryCache } from "../../persistence/InMemoryCache";
import { ICache } from "../../common/interfaces/ICache";
import { Task } from "../../domain/task/task";
import { Phase } from "../../domain/phase/phase";

const addTask = (phaseId: string, description: string): void => {
  //validate phaseId
  const cache = InMemoryCache.getInstance() as ICache;
  var phaseObj: Phase = cache.getItem<Phase>(phaseId);

  //implement this inside cache to get rid of new instance issue
  //make a dynamic solution for all kind of classes
  const phase = new Phase(
    phaseObj.name,
    phaseObj.prevPhase,
    phaseObj.nextPhase,
    phaseObj.isLocked,
    phaseObj.isDone,
    phaseObj.tasks
  );

  const task = new Task(description);
  phase.addTask(task);
  console.log(phase);
  cache.setItem(phaseId, phase);
};
export default addTask;
