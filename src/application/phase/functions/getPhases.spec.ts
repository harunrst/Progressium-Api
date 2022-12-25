import { Phase } from "../../../domain/phase/phase";
import { InitializePersistence } from "../../../persistence/startup";
import { InitializeApplication } from "../../startup";
import getPhases from "./getPhases";

describe("Phase Functions", () => {
  //setup environment
  InitializePersistence();
  InitializeApplication();

  it("getPhases return phases", () => {
    //arrange && act
    var phases: Phase[] = getPhases();

    //assert
    expect(phases.length).toBeGreaterThan(0);
  });
});
