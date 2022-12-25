import { Phase } from "./phase";
import * as PhaseConstants from "./constants";
import { Task } from "../task/task";

describe("Phase Domain", () => {
  it("Phase should be created as locked when there is previous phase", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);

    //act
    const secondPhase = new Phase(
      PhaseConstants.DefaultPhases.Discovery,
      phase.name
    );

    //assert
    expect(phase.isLocked).toBeFalsy();
    expect(secondPhase.isLocked).toBeTruthy();
  });

  it("addTask should add task", () => {
    //arramge
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    expect(phase.tasks.length).toBe(0);

    //act
    phase.addTask(new Task("oak"));

    //assert
    expect(phase.tasks.length).toBeGreaterThan(0);
  });

  it("addTask should sync phase status", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    const task = new Task("oak");
    phase.addTask(task);
    phase.completeTask(task.id);
    expect(phase.isDone).toBeTruthy();

    //act
    phase.addTask(new Task("oak"));

    //assert
    expect(phase.isDone).toBeFalsy();
  });

  it("completeTask should complete task", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    const task = new Task("oak");
    phase.addTask(task);

    //act
    phase.completeTask(task.id);

    //assert
    expect(phase.tasks[0].isDone).toBeTruthy();
    expect(phase.isDone).toBeTruthy();
  });

  it("completeTask throws exception if the phase is locked", () => {
    let errorMessage = "";
    try {
      //arrange
      const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
      const task = new Task("oak");
      phase.addTask(task);
      phase.lock();

      //act
      phase.completeTask(task.id);
    } catch (error) {
      errorMessage = error.message;
    } finally {
      //assert
      expect(errorMessage).toBe(PhaseConstants.Validations.PhaseIsLocked);
    }
  });

  it("completeTask throws exception if the task is not found", () => {
    let errorMessage = "";
    try {
      //arrrange
      const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
      const task = new Task("oak");
      phase.addTask(task);

      //act
      phase.completeTask("");
    } catch (error) {
      errorMessage = error.message;
    } finally {
      //assert
      expect(errorMessage).toBe(PhaseConstants.Validations.TaskNotFound);
    }
  });

  it("undoTask should undo task", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    const task = new Task("oak");
    phase.addTask(task);
    phase.completeTask(task.id);
    expect(phase.tasks[0].isDone).toBeTruthy();
    expect(phase.isDone).toBeTruthy();

    //act
    phase.undoTask(task.id);

    //assert
    expect(phase.tasks[0].isDone).toBeFalsy();
    expect(phase.isDone).toBeFalsy();
  });

  it("undoTask throws exception if the phase is locked", () => {
    let errorMessage = "";
    try {
      //arrange
      const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
      const task = new Task("oak");
      phase.addTask(task);
      phase.lock();

      //act
      phase.undoTask(task.id);
    } catch (error) {
      errorMessage = error.message;
    } finally {
      //assert
      expect(errorMessage).toBe(PhaseConstants.Validations.PhaseIsLocked);
    }
  });

  it("undoTask throws exception if the task is not found", () => {
    let errorMessage = "";
    try {
      //arrange
      const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
      const task = new Task("oak");
      phase.addTask(task);

      //act
      phase.undoTask("");
    } catch (error) {
      errorMessage = error.message;
    } finally {
      //assert
      expect(errorMessage).toBe(PhaseConstants.Validations.TaskNotFound);
    }
  });

  it("lock should lock the phase", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);

    //act
    phase.lock();

    //assert
    expect(phase.isLocked).toBeTruthy();
  });

  it("unlock should unlock the phase", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    phase.lock();

    //act
    phase.unlock();

    //assert
    expect(phase.isLocked).toBeFalsy();
  });
});
