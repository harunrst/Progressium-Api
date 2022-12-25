import {
  resolvers as ApplicationResolvers,
  typeDefs as ApplicationTypeDefs,
} from "../application/gql";
import defaultSchema from "./default";

export const typeDefs = [defaultSchema, ...ApplicationTypeDefs];
export const resolvers = [...ApplicationResolvers];
