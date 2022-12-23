import { Task } from "../task/task";
import * as PhaseConstants from "./constants";
export class Phase {
  readonly name: string;

  readonly prevPhase: string;

  readonly nextPhase: string;

  readonly tasks: Task[];

  isDone: boolean;

  isLocked: boolean;

  constructor(
    name: string,
    prevPhase?: string,
    nextPhase?: string,
    tasks?: Task[],
    isDone?: boolean,
    isLocked?: boolean
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
      this.tasks,
      this.isDone,
      this.isLocked
    );
  }

  addTask = (task: Task) => {
    if (this.isLocked) {
      throw new Error(PhaseConstants.Validations.PhaseIsLocked);
    }
    this.tasks.push(task);
  };

  lock = () => {
    this.isLocked = true;
  };
}
