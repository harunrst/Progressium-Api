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
//todo: add readme about architectural approaches and business
//todo: add meaningful versions to deployments
