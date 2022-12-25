import { DbContext } from "./dbContext";
import { InitializePersistence } from "./startup";

describe("Database Context integration tests", () => {
  //setup environment
  InitializePersistence();
  const key = "key";
  const value = "value";

  it("dbContext should create & find record", () => {
    //act
    DbContext.create(key, value);

    //assert
    const record = DbContext.find(key);
    expect(record).toBe(value);
  });

  it("dbContext should update record", () => {
    //arrange
    DbContext.create(key, value);

    //act
    const updateValue = "updateValue";
    DbContext.update(key, updateValue);

    //assert
    const record = DbContext.find(key);
    expect(record).toBe(updateValue);
  });
});
