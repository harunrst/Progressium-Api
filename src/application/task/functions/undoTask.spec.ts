import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { InitializePersistence } from "../../../persistence/startup";
import { InitializeApplication } from "../../startup";
import * as PhaseConstants from "../../../domain/phase/constants";
import completeTask from "./completeTask";
import { Task } from "../../../domain/task/task";
import undoTask from "./undoTask";

describe("Task Functions", () => {
  //setup environment
  InitializePersistence();
  InitializeApplication();

  it("undoTask should undo task", () => {
    //arrange
    let phase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Foundation
    )?.getInstance();
    expect(phase).not.toBeNull();
    const taskId = phase.addTask(new Task("oak"));
    DbContext.update<Phase>(phase.name, phase);
    completeTask(phase.name, taskId);

    //act
    undoTask(phase.name, taskId);

    //assert
    phase = DbContext.find<Phase>(PhaseConstants.DefaultPhases.Foundation);
    expect(phase).not.toBeNull();
    expect(phase.tasks).not.toBeNull();
    expect(phase.tasks.find((t) => t.id == taskId).isDone).toBeFalsy();
  });

  // it("undoTask should emit PhaseTasksUpdated", () => {});
});
