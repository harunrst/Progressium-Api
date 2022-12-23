import { v4 as uuidv4 } from "uuid";
import * as TaskConstants from "./constants";

//explain ddd and relations, the flow
//explain clean arch

//if undo a task in previous phase, next phases will be locked with completed tasks
//implement in memory event bus to emit undo from completed phase

export class Task {
  public readonly id: string;

  public readonly description: string;

  public readonly isDone: boolean;

  constructor(description: string) {
    this.id = uuidv4();

    if (description?.length < 3) {
      throw new Error(TaskConstants.DescriptionValidation);
    }
    this.description = description;

    this.isDone = false;
  }
}
