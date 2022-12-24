import express from "express";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

const app = express();

//initialize middlewares here

//required modules inside the appliation
InitializeComponents();

//app should be started at last
SetupGraphqlServer(app);

/*TODO:
 * add linter
 * design a database scheme as if it is in relational db and nosql
 * remove emitters from domain and handle in application
 * handle consts in better places
 * make sure domain is well designed
 * clean up singletons from extra declarations
 * add e2e and unit tests
 * add readme
 * add minifier
 * add logger and error handling middleware
 * add explanation to methods above
 * dockerize
 * travis ci
 * gcp: container registry and cloud run
 * investigate better practices for graphql types and resolves
 * fix const usages
 */
