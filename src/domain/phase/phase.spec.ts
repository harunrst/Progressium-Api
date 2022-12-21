import { Phase } from "./phase";
import * as PhaseConstants from "./constants";

describe("Phase", () => {
  it("Name validation", () => {
    try {
      const _ = new Phase("aa");
    } catch (error) {
      expect(error.message).toBe(PhaseConstants.NameValidation);
    }
  });

  it("Phase should be created successfully", () => {
    const phase = new Phase("oak");
    expect(!!phase.id).toBe(true);
    expect(!!phase.name).toBe(true);
  });
});
