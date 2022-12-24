import { Phase } from "../domain/phase/phase";
import * as PhaseConstants from "../domain/phase/constants";
import { DbContext } from "../persistence/dbContext";

/**
 * Sets the initial data for the application for quicker setup.
 */
export const setInitialData = () => {
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

  DbContext.create<Phase>(PhaseConstants.DefaultPhases.Foundation, foundation);
  DbContext.create<Phase>(PhaseConstants.DefaultPhases.Discovery, discovery);
  DbContext.create<Phase>(PhaseConstants.DefaultPhases.Delivery, delivery);
};
