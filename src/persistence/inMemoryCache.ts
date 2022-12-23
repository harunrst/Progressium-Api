import { ICache } from "../common/interfaces/ICache";
import NodeCache from "node-cache";

//explain the singleton here
//add tests
export class InMemoryCache implements ICache {
  private nodeCache: NodeCache;

  private static instance: InMemoryCache;

  private constructor() {
    this.nodeCache = new NodeCache();
  }

  public static getInstance(): InMemoryCache {
    if (!InMemoryCache.instance) {
      InMemoryCache.instance = new InMemoryCache();
    }
    return InMemoryCache.instance;
  }

  setItem<T>(key: string, value: T): void {
    this.nodeCache.set(key, value);
  }
  getItem<T>(key: string): T {
    return this.nodeCache.get(key);
  }
}
