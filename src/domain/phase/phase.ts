import { Task } from "../task/task";

export class Phase {
  public readonly name: string;

  public readonly tasks: Task[];

  public readonly isDone: boolean;

  public readonly isLocked: boolean;

  public readonly prevPhase: string;

  public readonly nextPhase: string;

  constructor(name: string, prevPhase?: string) {
    this.prevPhase = prevPhase;
    this.nextPhase = null;
    this.name = name;

    this.isDone = false;
    this.isLocked = !!prevPhase;
  }
}
