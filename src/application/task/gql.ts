import addTask from "./addTask";
import completeTask from "./completeTask";
import undoTask from "./undoTask";

export const taskDef = `#graphql
  input TaskInput { 
    phaseId: String
    description: String
  }
  input TaskPatchInput { 
    phaseId: String
    taskId: String
  }
  extend type Mutation {
    addTask(input: TaskInput!): Boolean
    completeTask(input: TaskPatchInput!): Boolean
    undoTask(input: TaskPatchInput!): Boolean
  }
`;

export const taskRes = {
  Mutation: {
    addTask: (_: any, { input: task }: any) =>
      addTask(task.phaseId, task.description),
    completeTask: (_: any, { input: taskPatchInput }: any) =>
      completeTask(taskPatchInput.phaseId, taskPatchInput.taskId),
    undoTask: (_: any, { input: taskPatchInput }: any) =>
      undoTask(taskPatchInput.phaseId, taskPatchInput.taskId),
  },
};
