import { Task } from "./task";
import * as TaskConstants from "./constants";

describe("Task", () => {
  it("Name validation", () => {
    try {
      const _ = new Task("aa");
    } catch (error) {
      expect(error.message).toBe(TaskConstants.NameValidation);
    }
  });

  it("Task should be created successfully", () => {
    const task = new Task("oak");
    expect(!!task.id).toBe(true);
    expect(!!task.name).toBe(true);
  });
});
