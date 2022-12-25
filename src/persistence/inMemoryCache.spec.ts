import { InMemoryCache } from "./inMemoryCache";

describe("InMemoryCache integration tests", () => {
  it("Cache should be initialized as singleton", () => {
    //arrange
    const key = "key";
    const value = "value";
    new InMemoryCache();

    //act
    const instance = InMemoryCache.getInstance();
    instance.setItem(key, value);
    const secondInstance = InMemoryCache.getInstance();

    //assert
    expect(secondInstance.getItem(key)).toBe(value);
  });
});
