import { v4 as uuidv4 } from "uuid";
import * as PhaseConstants from "./constants";

//for in-memory save, serialize/deserialize the object and save it.
//phases/id/tasks/id
export class Phase {
  public readonly id: string;

  public readonly name: string;

  constructor(name: string) {
    this.id = uuidv4();
    if (name?.length < 3) {
      throw new Error(PhaseConstants.NameValidation);
    }
    this.name = name;
  }
}
