import express from "express";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

const app = express();

//initialize middlewares here

//required modules inside the appliation
InitializeComponents();

//app should be started at last
SetupGraphqlServer(app);

/*TODO:
 * add an extension mt
 * design a database scheme as if it is in relational db and nosql
 * clean up singletons from extra declarations
 * add integration and more unit tests
 * add readme
 * add minifier
 * add logger and error handling middleware
 * add explanation comments to methods
 * dockerize
 * travis ci
 * gcp: container registry and cloud run
 * investigate better practices for graphql types and resolves
 */
