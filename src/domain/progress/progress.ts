import { v4 as uuidv4 } from "uuid";
import * as ProgressConstants from "./constants";

export class Progress {
  public readonly id: string;

  public readonly name: string;

  constructor(name: string) {
    this.id = uuidv4();
    if (name?.length < 3) {
      throw new Error(ProgressConstants.NameValidation);
    }
    this.name = name;
  }
}
