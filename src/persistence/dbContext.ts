import { ICache } from "../common/interfaces/ICache";
import { InMemoryCache } from "./inMemoryCache";

export class DbContext {
  /**
   * Create a record in the database
   * @params {string} key: Record key
   * @params {string} value: Record value
   */
  static create<T>(key: string, value: T): void {
    const cache: ICache = InMemoryCache.getInstance();
    return cache.setItem<T>(key, value);
  }

  /**
   * Update a record in the database
   * @params {string} key: Record key
   * @params {string} value: Record value
   */
  static update<T>(key: string, value: T): void {
    const cache: ICache = InMemoryCache.getInstance();
    return cache.setItem<T>(key, value);
  }

  /**
   * Find a record in the database
   * @params {string} key: Record key
   * @returns {T} Returns the found data
   */
  static find<T>(key: string): T {
    const cache: ICache = InMemoryCache.getInstance();
    return cache.getItem<T>(key);
  }
}
