import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import pkg from "body-parser";
import typeDefs from "./gql/typeDefs";
import resolvers from "./gql/resolvers";
import * as Utils from "./common/utils";

const app = express();
const { json } = pkg;
const apiVersion = "v1";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .start()
  .then(() => {
    app.use(
      `/${apiVersion}`,
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server)
    );

    const port = process.env.PORT || 4000;
    //start the app server
    app.listen(port);

    console.log(`🚀 Server ready at: ${port}`);
  })
  .catch((error) => {
    console.log(`App unable to start: ${error}`);
  });

Utils.setInitialData();
