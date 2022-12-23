export interface IEventBus {
  emit(key: string, value: string): void;
  listen(key: string, callback: any): void;
}
