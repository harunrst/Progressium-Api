import EventBus from "js-event-bus";
import { IEventBus } from "../common/interfaces/IEventBus";

export class InMemoryEventBus implements IEventBus {
  private eventBus: EventBus;

  private static instance: InMemoryEventBus;

  public constructor() {
    this.eventBus = new EventBus();
    InMemoryEventBus.instance = this;
  }

  static getInstance(): IEventBus {
    return InMemoryEventBus.instance;
  }

  emit(key: string, ...args: any[]): void {
    this.eventBus.emit(key, null, args);
  }

  listen(key: string, callback: any): void {
    this.eventBus.on(key, callback);
  }
}
