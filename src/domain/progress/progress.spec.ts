import { Progress } from "./progress";
import * as ProgressConstants from "./constants";

describe("Progress", () => {
  it("Name validation", () => {
    try {
      const _ = new Progress("aa");
    } catch (error) {
      expect(error.message).toBe(ProgressConstants.NameValidation);
    }
  });

  it("Progress should be created successfully", () => {
    const progress = new Progress("oak");
    expect(!!progress.id).toBe(true);
    expect(!!progress.name).toBe(true);
  });
});
