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
    const taskId = phase.addTask(new Task("oak"));

    //assert
    expect(phase.tasks.find((t) => t.id == taskId)).not.toBeNull();
  });

  it("addTask should sync phase status", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    const taskId = phase.addTask(new Task("oak"));
    phase.completeTask(taskId);
    expect(phase.isDone).toBeTruthy();

    //act
    phase.addTask(new Task("oak"));

    //assert
    expect(phase.isDone).toBeFalsy();
  });

  it("completeTask should complete task", () => {
    //arrange
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    const taskId = phase.addTask(new Task("oak"));

    //act
    phase.completeTask(taskId);

    //assert
    expect(phase.tasks[0].isDone).toBeTruthy();
    expect(phase.isDone).toBeTruthy();
  });

  it("completeTask throws exception if the phase is locked", () => {
    let errorMessage = "";
    try {
      //arrange
      const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
      const taskId = phase.addTask(new Task("oak"));
      phase.lock();

      //act
      phase.completeTask(taskId);
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
      phase.addTask(new Task("oak"));

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
    const taskId = phase.addTask(new Task("oak"));
    phase.completeTask(taskId);
    expect(phase.tasks.find((t) => t.id == taskId)?.isDone).toBeTruthy();
    expect(phase.isDone).toBeTruthy();

    //act
    phase.undoTask(taskId);

    //assert
    expect(phase.tasks.find((t) => t.id == taskId)?.isDone).toBeFalsy();
    expect(phase.isDone).toBeFalsy();
  });

  it("undoTask throws exception if the phase is locked", () => {
    let errorMessage = "";
    try {
      //arrange
      const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
      const taskId = phase.addTask(new Task("oak"));
      phase.lock();

      //act
      phase.undoTask(taskId);
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
      phase.addTask(new Task("oak"));

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
