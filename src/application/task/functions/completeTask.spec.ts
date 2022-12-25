import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { InitializePersistence } from "../../../persistence/startup";
import { InitializeApplication } from "../../startup";
import * as PhaseConstants from "../../../domain/phase/constants";
import completeTask from "./completeTask";
import { Task } from "../../../domain/task/task";

describe("Task Functions", () => {
  //setup environment
  InitializePersistence();
  InitializeApplication();

  it("completeTask should complete task", () => {
    //arrange
    let phase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Foundation
    ).getInstance();
    const task = new Task("oak");
    phase.addTask(task);
    DbContext.update<Phase>(phase.name, phase);

    //act
    completeTask(phase.name, task.id);

    //assert
    phase = DbContext.find<Phase>(PhaseConstants.DefaultPhases.Foundation);
    expect(phase.tasks.find((t) => t.id == task.id).isDone).toBeTruthy();
  });

  it("completeTask should emit PhaseTasksUpdated", () => {});
});
