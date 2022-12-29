import { Phase } from "../../../domain/phase/phase";
import { InitializePersistence } from "../../../persistence/startup";
import { InitializeApplication } from "../../startup";
import * as PhaseConstants from "../../../domain/phase/constants";
import getPhase from "./getPhase";

describe("Phase Functions", () => {
  //setup environment
  InitializePersistence();
  InitializeApplication();

  it("getPhase return phase by given name", () => {
    //arrange
    const expectedPhase = PhaseConstants.DefaultPhases.Foundation;

    //act
    const phase: Phase = getPhase(PhaseConstants.DefaultPhases.Foundation);

    //assert
    expect(phase).not.toBeNull();
    expect(phase.name).toBe(expectedPhase);
  });

  it("getPhase throws invalid phase when given name is not valid", () => {
    //arrange
    const expectedPhase = "";
    let errorMessage = null;

    try {
      //act
      const _: Phase = getPhase(expectedPhase);
    } catch (error) {
      errorMessage = error.message;
    } finally {
      //assert
      expect(errorMessage).toBe(PhaseConstants.Validations.InvalidPhaseName);
    }
  });
});
