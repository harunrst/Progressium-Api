import { v4 as uuidv4 } from "uuid";
import * as TaskConstants from "./constants";

//explain ddd and relations, the flow
//explain clean arch

//if undo a task in previous phase, next phases will be locked with completed tasks
//implement in memory event bus to emit undo from completed phase

export class Task {
  readonly description: string;

  readonly id: string;

  isDone: boolean;

  constructor(description: string, id?: string, isDone?: boolean) {
    if (description?.length < 3) {
      throw new Error(TaskConstants.Validations.Description);
    }
    this.description = description;

    this.id = id ?? uuidv4();
    this.isDone = isDone ?? false;
  }

  getInstance() {
    return new Task(this.description, this.id, this.isDone);
  }

  complete = () => {
    this.isDone = true;
    //emit an event to inform phases
  };

  undo = () => {
    this.isDone = false;
    //emit an event to inform phases
  };
}
