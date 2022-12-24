export interface IEventBus {
  /**
   * Emits an event
   * @params {string} key: Event identifier
   * @params {...any[]} args: Event arguments to be listened
   */
  emit(key: string, ...args: any[]): void;

  /**
   * Initializes a listener for events
   * @params {string} key: Event identifier
   * @params {any} callback: The function to be run when listener emit an event
   */
  listen(key: string, callback: any): void;
}
