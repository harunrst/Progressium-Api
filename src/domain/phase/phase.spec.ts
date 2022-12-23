import { Phase } from "./phase";
import * as PhaseConstants from "./constants";
import { Task } from "../task/task";

describe("Phase", () => {
  it("Phase should be created as locked if there is previous phase", () => {
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    expect(phase.isLocked).toBeFalsy();

    const secondPhase = new Phase(
      PhaseConstants.DefaultPhases.Discovery,
      phase.name
    );
    expect(secondPhase.isLocked).toBeTruthy();
  });

  it("addTask throws validation when the phase is locked", () => {
    try {
      const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
      phase.lock();
      phase.addTask(new Task("oak"));
    } catch (error) {
      expect(error.message).toBe(PhaseConstants.Validations.PhaseIsLocked);
    }
  });

  it("addTask should add task", () => {
    const phase = new Phase(PhaseConstants.DefaultPhases.Foundation);
    expect(phase.tasks.length).toBe(0);
    phase.addTask(new Task("oak"));
    expect(phase.tasks.length).toBeGreaterThan(0);
  });
});
