import {
  resolvers as ApplicationResolvers,
  typeDefs as ApplicationTypeDefs,
} from "../application/gql";
import defaultSchema from "./default";
import { healthDef, healthRes } from "./health";

export const typeDefs = [defaultSchema, healthDef, ...ApplicationTypeDefs];
export const resolvers = [healthRes, ...ApplicationResolvers];
