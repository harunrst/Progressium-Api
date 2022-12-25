import { Task } from "./task";
import * as TaskConstants from "./constants";

describe("Task Domain", () => {
  it("Task should be created successfully", () => {
    //arrange
    const taksDesc = "oak";

    //act
    const task = new Task(taksDesc);

    //assert
    expect(!!task.id).toBeTruthy();
    expect(task.description).toBe(taksDesc);
  });

  it("Task creation throw validation when description is not valid", () => {
    let errorMessage = "";
    try {
      //arrange & act
      new Task("aa");
    } catch (error) {
      errorMessage = error.message;
    } finally {
      //assert
      expect(errorMessage).toBe(TaskConstants.Validations.Description);
    }
  });

  it("Task should be done successfully", () => {
    //arrrange
    const task = new Task("oak");

    //act
    task.complete();

    //assert
    expect(task.isDone).toBeTruthy();
  });

  it("Task should be undo successfully", () => {
    //arrange
    const task = new Task("oak");

    //act
    task.undo();

    //assert
    expect(task.isDone).toBeFalsy();
  });
});
