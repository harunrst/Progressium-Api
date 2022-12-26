import express from "express";
import { InitializeComponents, StartGraphqlServer } from "./startup";

const app = express();

//required modules inside the application
InitializeComponents();

//app should be started at last
StartGraphqlServer(app);
