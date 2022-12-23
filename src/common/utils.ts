import { InMemoryCache } from "../persistence/InMemoryCache";
import { Phase } from "../domain/phase/phase";
import * as PhaseConstants from "../domain/phase/constants";
import { ICache } from "./interfaces/ICache";

//add tests
//move to phase utils in application
export const setInitialData = () => {
  const cache = InMemoryCache.getInstance() as ICache;
  const foundation = new Phase(PhaseConstants.DefaultPhases.Foundation);
  const discovery = new Phase(
    PhaseConstants.DefaultPhases.Discovery,
    foundation.name
  );
  foundation.nextPhase = discovery.name;
  const delivery = new Phase(
    PhaseConstants.DefaultPhases.Delivery,
    discovery.name
  );
  discovery.nextPhase = delivery.name;

  cache.setItem<Phase>(PhaseConstants.DefaultPhases.Foundation, foundation);
  cache.setItem<Phase>(PhaseConstants.DefaultPhases.Discovery, discovery);
  cache.setItem<Phase>(PhaseConstants.DefaultPhases.Delivery, delivery);
};
