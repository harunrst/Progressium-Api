import express from "express";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

const app = express();

//required modules inside the appliation
InitializeComponents();

//app should be started at last
SetupGraphqlServer(app);

//todo: add e2e test
//todo: add integration tests for app startup components
//todo: implement a bundler preferrably webpack
//todo: implement error handling middlewares
//todo: implement logging solution project-wide
//todo: dockerize the app, implement ci/cd. preferrably travis ci -> google clould container registry and cloud run
//todo: apply better practices for graphql setup
//todo: add readme about architectural approaches and business
