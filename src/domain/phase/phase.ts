import { Task } from "../task/task";

export class Phase {
  public readonly name: string;

  public readonly tasks: Task[];

  public readonly isDone: boolean;

  public readonly isLocked: boolean;

  public readonly prevPhase: string;

  public readonly nextPhase: string;

  constructor(
    name: string,
    prevPhase?: string,
    nextPhase?: string,
    isLocked?: boolean,
    isDone?: boolean,
    tasks?: Task[]
  ) {
    this.name = name;
    this.prevPhase = prevPhase ?? null;
    this.nextPhase = nextPhase ?? null;
    this.tasks = tasks ?? [];
    this.isDone = isDone ?? false;
    this.isLocked = isLocked ?? !!prevPhase;
  }

  public addTask = (task: Task) => {
    this.tasks.push(task);
  };
}
