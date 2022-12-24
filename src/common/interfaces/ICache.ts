export interface ICache {
  /**
   * Sets an item to cache
   * @params {string} key: Cache key
   * @params {string} value: Cache value to set
   */
  setItem<T>(key: string, value: T): void;

  /**
   * Get an item from cache
   * @params {string} key: Cache key
   * @returns the cache value
   */
  getItem<T>(key: string): T;
}
