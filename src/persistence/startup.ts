import { InMemoryEventBus } from "./inMemoryEventBus";
import { InMemoryCache } from "./inMemoryCache";

export const InitializePersistence = () => {
  //initialize cache singleton
  new InMemoryCache();

  //initalize event bus singleton
  new InMemoryEventBus();
};
