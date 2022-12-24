import { ICache } from "../common/interfaces/ICache";
import NodeCache from "node-cache";

export class InMemoryCache implements ICache {
  private nodeCache: NodeCache;

  private static instance: InMemoryCache;

  public constructor() {
    this.nodeCache = new NodeCache();
    InMemoryCache.instance = this;
  }

  static getInstance(): ICache {
    return InMemoryCache.instance;
  }

  setItem<T>(key: string, value: T): void {
    this.nodeCache.set(key, value);
  }
  getItem<T>(key: string): T {
    return this.nodeCache.get(key);
  }
}
