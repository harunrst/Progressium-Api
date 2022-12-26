import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import { typeDefs, resolvers } from "./gql";
import { InitializeApplication } from "./application/startup";
import express from "express";
import { InitializePersistence } from "./persistence/startup";

export const SetupGraphqlServer = (): ApolloServer => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return server;
};

export const StartGraphqlServer = (app: express.Express) => {
  const server = SetupGraphqlServer();
  server
    .start()
    .then(() => {
      app.use(
        `/api`,
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
};

export const InitializeComponents = () => {
  InitializePersistence();
  InitializeApplication();
};
