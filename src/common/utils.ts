import { InMemoryCache } from "../persistence/InMemoryCache";
import { Phase } from "../domain/phase/phase";
import * as Constants from "../common/constants";
import { ICache } from "./interfaces/ICache";

//add tests
export const setInitialData = () => {
  const cache = InMemoryCache.getInstance() as ICache;
  const foundation = new Phase(Constants.DefaultPhases.Foundation);
  const discovery = new Phase(
    Constants.DefaultPhases.Discovery,
    foundation.name
  );
  const delivery = new Phase(Constants.DefaultPhases.Delivery, discovery.name);

  cache.setItem<Phase>(Constants.DefaultPhases.Foundation, foundation);
  cache.setItem<Phase>(Constants.DefaultPhases.Discovery, discovery);
  cache.setItem<Phase>(Constants.DefaultPhases.Delivery, delivery);
};
