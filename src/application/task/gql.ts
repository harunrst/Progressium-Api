import addTask from "./addTask";
import completeTask from "./completeTask";

export const taskDef = `#graphql
  input TaskInput { 
    phaseId: String
    description: String
  }
  input TaskCompleteInput { 
    phaseId: String
    taskId: String
  }
  extend type Mutation {
    addTask(input: TaskInput!): Boolean
    completeTask(input: TaskCompleteInput!): Boolean
  }
`;

export const taskRes = {
  Mutation: {
    addTask: (_: any, { input: task }: any) =>
      addTask(task.phaseId, task.description),
    completeTask: (_: any, { input: taskComplete }: any) =>
      completeTask(taskComplete.phaseId, taskComplete.taskId),
  },
};
