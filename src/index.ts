import express from "express";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

const app = express();

//required modules inside the appliation
InitializeComponents();

//app should be started at last
SetupGraphqlServer(app);

//todo: add e2e test (unit & integration tests are covering very much already, no rush for this)
//todo: add integration tests for app startup components
//todo: implement error handling middleware & error/exception types
//todo: implement logging solution project-wide
//todo: implement ci/cd. preferrably travis ci -> google clould container registry and cloud run
//todo: add readme about architectural approaches and business
