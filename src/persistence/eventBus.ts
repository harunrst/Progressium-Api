import { IEventBus } from "../common/interfaces/IEventBus";
import { InMemoryEventBus } from "./inMemoryEventBus";

export class EventBus {
  static emit(key: string, ...args: any[]): void {
    const eventBus: IEventBus = InMemoryEventBus.getInstance();
    eventBus.emit(key, ...args);
  }
  static listen(key: string, callback: any): void {
    const eventBus: IEventBus = InMemoryEventBus.getInstance();
    eventBus.listen(key, callback);
  }
}
