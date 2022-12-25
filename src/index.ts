import express from "express";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

const app = express();

//todo: initialize middlewares here

//required modules inside the appliation
InitializeComponents();

//app should be started at last
SetupGraphqlServer(app);

/*TODO:
 * design a database scheme as if it is in relational db and nosql
 * add more tests and explain why some e2e and integration are missings
 * test app setup
 * test gql
 * add readme
 * add minifier
 * add logger and error handling middleware
 * dockerize
 * travis ci
 * gcp: container registry and cloud run
 * investigate better practices for graphql types and resolves
 */
