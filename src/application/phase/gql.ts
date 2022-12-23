import getPhases from "./getPhases";

export const phaseDef = `#graphql
  type Task {
    description: String
    isDone: Boolean
  }
  type Phase { 
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
