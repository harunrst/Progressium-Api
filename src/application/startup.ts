import { PhaseCompletionListeners } from "./phase/listeners";
import { setInitialData } from "./phase/utils";

export const InitializeApplication = () => {
  //initializes phases
  setInitialData();

  //initalize listeners
  PhaseCompletionListeners();
};
