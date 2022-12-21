import { v4 as uuidv4 } from "uuid";
import * as TaskConstants from "./constants";

//explain ddd and relations, the flow

//add phase domain
//phases should be linked list
//as in with the id of prev and next phase
//phase: id, name, list of tasks, isDone, isLocked
//if undo a task in previous phase, next phases will be locked with completed tasks
//implement in memory event bus to emit undo from completed phase

export class Task {
  public readonly id: string;

  public readonly phaseId: string;

  public readonly description: string;

  public readonly isDone: boolean;

  constructor(phaseId: string, description: string) {
    this.id = uuidv4();
    this.phaseId = phaseId;

    if (description?.length < 3) {
      throw new Error(TaskConstants.DescriptionValidation);
    }
    this.description = description;

    this.isDone = false;
  }
}
