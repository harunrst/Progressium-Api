import { Phase } from "../../domain/phase/phase";
import { DbContext } from "../../persistence/dbContext";
import { InitializePersistence } from "../../persistence/startup";
import { InitializeApplication } from "../startup";
import * as PhaseConstants from "../../domain/phase/constants";
import { EventBus } from "../../persistence/eventBus";
import * as ApplicationConstants from "../constants";

describe("Phase Listeners", () => {
  //setup environment
  InitializePersistence();
  InitializeApplication();

  it("phaseTasksUpdated event should unlock next phases when the phase is done", () => {
    //arrange
    const phase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Foundation
    );
    expect(phase).not.toBeNull();
    phase.isDone = true;
    DbContext.update<Phase>(phase.name, phase);

    //act
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      phase.name
    );

    //assert
    const nextPhase = DbContext.find<Phase>(phase.nextPhase);
    expect(nextPhase).not.toBeNull();
    expect(nextPhase.isLocked).toBeFalsy();
  });

  it("phaseTasksUpdated event should lock next phases when any of the previous phase is undo to not done", () => {
    //arrange
    const phase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Foundation
    );
    expect(phase).not.toBeNull();

    phase.isDone = true;
    DbContext.update<Phase>(phase.name, phase);
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      phase.name
    );
    let secondPhase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Discovery
    );
    expect(secondPhase).not.toBeNull();

    secondPhase.isDone = true;
    DbContext.update<Phase>(secondPhase.name, secondPhase);
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      secondPhase.name
    );
    let thirdPhase = DbContext.find<Phase>(secondPhase.nextPhase);
    expect(thirdPhase).not.toBeNull();
    expect(secondPhase.isLocked).toBeFalsy();
    expect(thirdPhase.isLocked).toBeFalsy();

    //act
    phase.isDone = false;
    DbContext.update<Phase>(phase.name, phase);
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      phase.name
    );

    //assert
    secondPhase = DbContext.find<Phase>(secondPhase.name);
    thirdPhase = DbContext.find<Phase>(secondPhase.nextPhase);
    expect(secondPhase).not.toBeNull();
    expect(thirdPhase).not.toBeNull();
    expect(secondPhase.isLocked).toBeTruthy();
    expect(thirdPhase.isLocked).toBeTruthy();
  });

  it("phaseTasksUpdated event should unlock all next phases which are done until find undone", () => {
    //arrange
    const phase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Foundation
    );
    expect(phase).not.toBeNull();
    phase.isDone = true;
    phase.isLocked = true;
    DbContext.update<Phase>(phase.name, phase);
    let secondPhase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Discovery
    );
    expect(secondPhase).not.toBeNull();
    secondPhase.isDone = true;
    secondPhase.isLocked = true;
    DbContext.update<Phase>(secondPhase.name, secondPhase);
    let thirdPhase = DbContext.find<Phase>(secondPhase.nextPhase);
    expect(thirdPhase).not.toBeNull();
    thirdPhase.isDone = false;
    thirdPhase.isLocked = true;
    DbContext.update<Phase>(thirdPhase.name, thirdPhase);

    //act
    phase.isDone = true;
    DbContext.update<Phase>(phase.name, phase);
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      phase.name
    );

    //assert
    secondPhase = DbContext.find<Phase>(secondPhase.name);
    thirdPhase = DbContext.find<Phase>(secondPhase.nextPhase);
    expect(secondPhase).not.toBeNull();
    expect(thirdPhase).not.toBeNull();
    expect(secondPhase.isLocked).toBeFalsy();
    expect(thirdPhase.isLocked).toBeFalsy();
  });
});
