import { Task } from "./task";
import * as TaskConstants from "./constants";

describe("Task", () => {
  it("Description validation", () => {
    try {
      const _ = new Task("aa");
    } catch (error) {
      expect(error.message).toBe(TaskConstants.Validations.Description);
    }
  });

  it("Task should be created successfully", () => {
    const task = new Task("oak");
    expect(!!task.id).toBe(true);
    expect(!!task.description).toBe(true);
  });

  it("Task should be done successfully", () => {
    const task = new Task("oak");
    task.complete();
    expect(task.isDone).toBe(true);
  });
});
