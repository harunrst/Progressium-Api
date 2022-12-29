import { InitializePersistence } from "../persistence/startup";
import getPhases from "./phase/functions/getPhases";
import { isValidPhase, setInitialData } from "./utils";
import * as PhaseConstants from "../domain/phase/constants";

describe("Application Utils", () => {
  //setup environment
  InitializePersistence();

  it("setInitialData creates initial phases", () => {
    //arrange && act
    setInitialData();

    //assert
    const phases = getPhases();
    expect(phases.length).toBe(3);
    expect(
      phases.find((p) => p.name == PhaseConstants.DefaultPhases.Foundation)
        .nextPhase
    ).toBe(PhaseConstants.DefaultPhases.Discovery);
    expect(
      phases.find((p) => p.name == PhaseConstants.DefaultPhases.Foundation)
        .prevPhase
    ).toBeNull();
    expect(
      phases.find((p) => p.name == PhaseConstants.DefaultPhases.Discovery)
        .prevPhase
    ).toBe(PhaseConstants.DefaultPhases.Foundation);
    expect(
      phases.find((p) => p.name == PhaseConstants.DefaultPhases.Discovery)
        .nextPhase
    ).toBe(PhaseConstants.DefaultPhases.Delivery);
    expect(
      phases.find((p) => p.name == PhaseConstants.DefaultPhases.Delivery)
        .prevPhase
    ).toBe(PhaseConstants.DefaultPhases.Discovery);
    expect(
      phases.find((p) => p.name == PhaseConstants.DefaultPhases.Delivery)
        .nextPhase
    ).toBeNull();
  });

  it("isValidPhase validates phases", () => {
    expect(isValidPhase(PhaseConstants.DefaultPhases.Foundation)).toBeTruthy();
    expect(isValidPhase(PhaseConstants.DefaultPhases.Discovery)).toBeTruthy();
    expect(isValidPhase(PhaseConstants.DefaultPhases.Delivery)).toBeTruthy();
    expect(isValidPhase(String.Empty)).toBeFalsy();
    expect(isValidPhase(null)).toBeFalsy();
    expect(isValidPhase(undefined)).toBeFalsy();
  });
});
