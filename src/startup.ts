import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import typeDefs from "./gql/typeDefs";
import resolvers from "./gql/resolvers";
import { InitializeApplication } from "./application/startup";
import express from "express";
import { InitializePersistence } from "./persistence/startup";

export const SetupGraphqlServer = (app: express.Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

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
