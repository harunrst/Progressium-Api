import { initializePhaseListeners } from "./phase/listeners";
import { setInitialData } from "./utils";

/**
 * Initializes startup components from application
 * It should be called during startup
 */
export const InitializeApplication = () => {
  setInitialData();
  initializePhaseListeners();
};
