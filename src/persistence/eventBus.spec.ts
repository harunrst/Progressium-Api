import { EventBus } from "./eventBus";
import { InitializePersistence } from "./startup";

describe("EventBus integration tests", () => {
  //setup environment
  InitializePersistence();

  it("Events should be emitted by listeners", () => {
    //arrange
    const eventKey = "event";
    const eventMessage = "arg1";
    let eventUpdateArg = "";

    EventBus.listen(eventKey, (args: any[]) => {
      eventUpdateArg = args[0];
    });

    //act
    EventBus.emit(eventKey, eventMessage);

    //assert
    expect(eventUpdateArg).toBe(eventMessage);
  });
});
