import { ICache } from "../common/interfaces/ICache";
import { InMemoryCache } from "./InMemoryCache";

export class DbContext {
  static create<T>(key: string, value: T): void {
    const cache = InMemoryCache.getInstance() as ICache;
    return cache.setItem<T>(key, value);
  }
  static update<T>(key: string, value: T): void {
    const cache = InMemoryCache.getInstance() as ICache;
    return cache.setItem<T>(key, value);
  }
  static find<T>(key: string): T {
    const cache = InMemoryCache.getInstance() as ICache;
    return cache.getItem<T>(key);
  }
}
