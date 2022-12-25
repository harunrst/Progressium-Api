import { phaseDef, phaseRes } from "../application/phase/gql";
import { taskDef, taskRes } from "../application/task/gql";

export const resolvers = [phaseRes, taskRes];
export const typeDefs = [phaseDef, taskDef];
