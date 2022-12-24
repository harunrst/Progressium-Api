import { Task } from "./task";
import * as TaskConstants from "./constants";

describe("Task", () => {
  it("Description validation", () => {
    try {
      new Task("aa");
    } catch (error) {
      expect(error.message).toBe(TaskConstants.Validations.Description);
    }
  });

  it("Task should be created successfully", () => {
    const taksDesc = "oak";
    const task = new Task(taksDesc);
    expect(!!task.id).toBeTruthy();
    expect(task.description).toBe(taksDesc);
  });

  it("Task should be done successfully", () => {
    const task = new Task("oak");
    task.complete();
    expect(task.isDone).toBeTruthy();
  });

  it("Task should be undo successfully", () => {
    const task = new Task("oak");
    task.undo();
    expect(task.isDone).toBeFalsy();
  });
});
