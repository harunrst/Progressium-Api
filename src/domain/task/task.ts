import { v4 as uuidv4 } from "uuid";
import * as TaskConstants from "./constants";

//explain why I dont have phase and progress domain
//explain ddd and relational database, entities

export class Task {
  public readonly id: string;

  public readonly name: string;

  constructor(name: string) {
    this.id = uuidv4();
    if (name?.length < 3) {
      throw new Error(TaskConstants.NameValidation);
    }
    this.name = name;
  }
}
