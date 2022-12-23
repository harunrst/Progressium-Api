export interface ICache {
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): T;
}
