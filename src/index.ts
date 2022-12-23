import express from "express";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

const app = express();

//initialize middlewares here

//required modules inside the appliation
InitializeComponents();

//app should be started at last
SetupGraphqlServer(app);

/*TODO:
 * abstract database with in memory cache
 * abstract event bus with in memory event bus
 * make sure low dependency among components
 * make sure domain is well designed
 * clean up singletons from extra declarations
 * add more tests
 * better design listeners/tests
 * implement remaning business logic
 * add readme
 * add minifier
 * add logger and error handling middleware
 * add explanation to methods above
 * dockerize
 * travis ci
 * gcp: container registry and cloud run
 * investigate better practices for graphql types and resolves
 */
