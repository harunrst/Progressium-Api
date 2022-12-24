import getPhases from "./functions/getPhases";

export const phaseDef = `#graphql
  type Task {
    id: String
    description: String
    isDone: Boolean
  }
  type Phase { 
    nextPhase: String
    prevPhase: String
    name: String
    isDone: Boolean
    isLocked: Boolean
    tasks: [Task]
  }
  extend type Query {
    phases: [Phase]
  }
`;

export const phaseRes = {
  Query: {
    phases: () => getPhases(),
  },
};
