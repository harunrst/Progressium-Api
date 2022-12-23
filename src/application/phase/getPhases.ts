import { Phase } from "../../domain/phase/phase";
import * as PhaseConstants from "../../domain/phase/constants";
import { InMemoryCache } from "../../persistence/InMemoryCache";
import { ICache } from "../../common/interfaces/ICache";

const getPhases = (): Phase[] => {
  const cache = InMemoryCache.getInstance() as ICache;
  const phases = [
    cache.getItem<Phase>(PhaseConstants.DefaultPhases.Foundation),
    cache.getItem<Phase>(PhaseConstants.DefaultPhases.Discovery),
    cache.getItem<Phase>(PhaseConstants.DefaultPhases.Delivery),
  ];
  return phases;
};
export default getPhases;
