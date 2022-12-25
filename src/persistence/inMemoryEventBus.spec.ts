import { InMemoryEventBus } from "./inMemoryEventBus";

describe("InMemoryEventBus integration tests", () => {
  it("Event bus should be initialized as singleton", () => {
    //arrange
    const key = "key";
    let value = "value";
    const newValue = "newValue";
    new InMemoryEventBus();

    //act
    const instance = InMemoryEventBus.getInstance();
    instance.listen(key, () => {
      value = newValue;
    });
    const secondInstance = InMemoryEventBus.getInstance();
    secondInstance.emit(key);

    //assert
    expect(value).toBe(newValue);
  });
});
