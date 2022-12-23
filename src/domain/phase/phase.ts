import { Task } from "../task/task";

export class Phase {
  readonly name: string;

  readonly tasks: Task[];

  readonly isDone: boolean;

  readonly isLocked: boolean;

  readonly prevPhase: string;

  readonly nextPhase: string;

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

  getInstance() {
    return new Phase(
      this.name,
      this.prevPhase,
      this.nextPhase,
      this.isLocked,
      this.isDone,
      this.tasks
    );
  }

  addTask = (task: Task) => {
    this.tasks.push(task);
  };
}
