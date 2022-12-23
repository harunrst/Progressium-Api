import { IEventBus } from "./common/interfaces/IEventBus";
import * as Utils from "./common/utils";
import { InMemoryEventBus } from "./persistence/eventBus";

export const InitializeApplication = () => {
  //initializes phases
  Utils.setInitialData();

  //initalize listeners
  const eventBus = InMemoryEventBus.getInstance() as IEventBus;
};
