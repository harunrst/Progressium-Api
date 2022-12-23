import { InMemoryCache } from "../../persistence/InMemoryCache";
import { ICache } from "../../common/interfaces/ICache";
import { Phase } from "../../domain/phase/phase";

const completeTask = (phaseId: string, taskId: string): void => {
  const cache = InMemoryCache.getInstance() as ICache;
  var phase: Phase = cache.getItem<Phase>(phaseId).getInstance();

  phase.completeTask(taskId);

  cache.setItem(phaseId, phase);
};
export default completeTask;
