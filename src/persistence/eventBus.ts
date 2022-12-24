import { IEventBus } from "../common/interfaces/IEventBus";
import { InMemoryEventBus } from "./inMemoryEventBus";

export class EventBus {
  /**
   * Emits an event
   * @params {string} key: Event identifier
   * @params {...any[]} args: Event arguments to be listened
   */
  static emit(key: string, ...args: any[]): void {
    const eventBus: IEventBus = InMemoryEventBus.getInstance();
    eventBus.emit(key, ...args);
  }

  /**
   * Initializes a listener for events
   * @params {string} key: Event identifier
   * @params {any} callback: The function to be run when listener emit an event
   */
  static listen(key: string, callback: any): void {
    const eventBus: IEventBus = InMemoryEventBus.getInstance();
    eventBus.listen(key, callback);
  }
}
