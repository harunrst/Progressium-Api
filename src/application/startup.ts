import { PhaseCompletionListeners } from "./phase/listeners";
import { setInitialData } from "./utils";

export const InitializeApplication = () => {
  //initializes phases
  setInitialData();

  //initalize listeners
  PhaseCompletionListeners();
};
