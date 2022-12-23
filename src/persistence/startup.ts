import { ICache } from "../common/interfaces/ICache";
import { IEventBus } from "../common/interfaces/IEventBus";
import { InMemoryEventBus } from "./eventBus";
import { InMemoryCache } from "./InMemoryCache";

export const InitializePersistence = () => {
  //initialize cache singleton
  InMemoryCache.getInstance() as ICache;

  //initalize event bus singleton
  InMemoryEventBus.getInstance() as IEventBus;
};
