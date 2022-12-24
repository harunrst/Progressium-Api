import { InMemoryEventBus } from "./inMemoryEventBus";
import { InMemoryCache } from "./InMemoryCache";

export const InitializePersistence = () => {
  //initialize cache singleton
  new InMemoryCache();

  //initalize event bus singleton
  new InMemoryEventBus();
};
