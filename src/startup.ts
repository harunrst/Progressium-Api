import * as Utils from "./common/utils";
import { InitializeApplication } from "./application/startup";

export const InitializeDomain = () => {
  //initializes phases
  Utils.setInitialData();

  //initalize application
  InitializeApplication();
};
