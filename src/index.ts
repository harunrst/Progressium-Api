import express from "express";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

const app = express();

//required modules inside the appliation
InitializeComponents();

//app should be started at last
SetupGraphqlServer(app);

//todo: implement bundler such as webpack
//todo: add integration tests for app startup components
//todo: add request and error handling middlewares
//todo: add logging solution project-wide
//todo: dockerize the app, implement ci/cd. preferrably travis ci -> google clould container registry and cloud run
//todo: apply better practices for graphql setup
