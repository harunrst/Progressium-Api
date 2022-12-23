import addTask from "./addTask";

export const taskDef = `#graphql
  input TaskInput { 
    phaseId: String
    description: String
  }
  extend type Mutation {
    addTask(input: TaskInput!): Boolean
  }
`;

export const taskRes = {
  Mutation: {
    addTask: (_, { input: task }: any) =>
      addTask(task.phaseId, task.description),
  },
};
