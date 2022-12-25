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

    //act
    addTask(phase.name, "oak");

    //assert
    phase = DbContext.find<Phase>(PhaseConstants.DefaultPhases.Foundation);
    expect(phase.tasks.length).toBeGreaterThan(0);
  });

  it("addTask should emit PhaseTasksUpdated", () => {});
});