export interface IEventBus {
  emit(key: string, ...args: any[]): void;
  listen(key: string, callback: any): void;
}
