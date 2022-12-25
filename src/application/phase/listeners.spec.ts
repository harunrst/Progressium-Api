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
    phase.isDone = true;
    DbContext.update<Phase>(phase.name, phase);

    //act
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      phase.name
    );

    //assert
    const nextPhase = DbContext.find<Phase>(phase.nextPhase);
    expect(nextPhase.isLocked).toBeFalsy();
  });

  it("phaseTasksUpdated event should lock next phases when any of the previous phase is undo to not done", () => {
    //arrange
    const phase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Foundation
    );
    phase.isDone = true;
    DbContext.update<Phase>(phase.name, phase);
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      phase.name
    );
    let secondPhase = DbContext.find<Phase>(
      PhaseConstants.DefaultPhases.Discovery
    );
    secondPhase.isDone = true;
    DbContext.update<Phase>(secondPhase.name, secondPhase);
    EventBus.emit(
      ApplicationConstants.EventNames.PhaseTasksUpdated,
      secondPhase.name
    );
    let thirdPhase = DbContext.find<Phase>(secondPhase.nextPhase);
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
    expect(secondPhase.isLocked).toBeTruthy();
    expect(thirdPhase.isLocked).toBeTruthy();
  });
});
