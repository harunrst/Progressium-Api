import { Phase } from "../../../domain/phase/phase";
import { DbContext } from "../../../persistence/dbContext";
import { InitializePersistence } from "../../../persistence/startup";
import { InitializeApplication } from "../../startup";
import * as PhaseConstants from "../../../domain/phase/constants";
import addTask from "./addTask";

describe("Task Functions", () => {
  //setup environment
  InitializePersistence();
  InitializeApplication();

  it("addTask should add task", () => {
    //arrange
    let phase = DbContext.find<Phase>(PhaseConstants.DefaultPhases.Foundation);
    expect(phase).not.toBeNull();

    //act
    const taskId = addTask(phase.name, "oak");

    //assert
    phase = DbContext.find<Phase>(PhaseConstants.DefaultPhases.Foundation);
    expect(phase).not.toBeNull();
    expect(phase.tasks.find((t) => t.id == taskId)).not.toBeNull();
  });

  // it("addTask should emit PhaseTasksUpdated", () => {});
});
