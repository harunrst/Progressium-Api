import { Task } from "../task/task";
import * as PhaseConstants from "./constants";
export class Phase {
  readonly name: string;

  readonly prevPhase: string;

  readonly nextPhase: string;

  tasks: Task[];

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

  completeTask = (taskId: string) => {
    if (this.isLocked) {
      throw new Error(PhaseConstants.Validations.PhaseIsLocked);
    }
    var task = this.tasks.find((t) => t.id == taskId).getInstance();
    if (!task) {
      throw new Error(PhaseConstants.Validations.TaskNotFound);
    }
    task.complete();
    this.tasks = this.tasks.map((t) => {
      if (t.id == task.id) {
        return task;
      }
      return t;
    });

    this.controlStatus();
  };

  undoTask = (taskId: string) => {};

  private controlStatus = () => {
    if (this.tasks.every((t) => t.isDone)) {
      this.isDone = true;
      //emit event to let other phases know to unlock next phase
    } else {
      this.isDone = false;
      //emit event to let other phases know to lock next phase
    }
  };

  lock = () => {
    this.isLocked = true;
  };
}
