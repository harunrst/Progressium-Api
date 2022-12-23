import { Phase } from "../../domain/phase/phase";
import * as Constants from "../../common/constants";
import { InMemoryCache } from "../../persistence/InMemoryCache";
import { ICache } from "../../common/interfaces/ICache";

const getPhases = (): Phase[] => {
  const cache = InMemoryCache.getInstance() as ICache;
  const phases = [
    cache.getItem<Phase>(Constants.DefaultPhases.Foundation),
    cache.getItem<Phase>(Constants.DefaultPhases.Discovery),
    cache.getItem<Phase>(Constants.DefaultPhases.Delivery),
  ];
  return phases;
};
export default getPhases;
