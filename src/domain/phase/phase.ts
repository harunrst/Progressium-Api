import { Task } from "../task/task";
import * as PhaseConstants from "./constants";

//consider entire domain folder as a internally published library since it is the main concern of the app
//this is why other components freely includes dependencies to domain without having doubts
export class Phase {
  readonly name: string;

  readonly prevPhase: string;

  nextPhase: string;

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
    this.tasks.push(task);
    this.syncPhaseStatus();
    return task.id;
  };

  completeTask = (taskId: string) => {
    if (this.isLocked) {
      throw new Error(PhaseConstants.Validations.PhaseIsLocked);
    }
    const task = this.tasks.find((t) => t.id == taskId)?.getInstance();
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
    this.syncPhaseStatus();
  };

  undoTask = (taskId: string) => {
    if (this.isLocked) {
      throw new Error(PhaseConstants.Validations.PhaseIsLocked);
    }
    const task = this.tasks.find((t) => t.id == taskId)?.getInstance();
    if (!task) {
      throw new Error(PhaseConstants.Validations.TaskNotFound);
    }
    task.undo();
    this.tasks = this.tasks.map((t) => {
      if (t.id == task.id) {
        return task;
      }
      return t;
    });
    this.syncPhaseStatus();
  };

  private syncPhaseStatus = () => {
    this.isDone = this.tasks.every((t) => t.isDone);
  };

  lock = () => {
    this.isLocked = true;
  };

  unlock = () => {
    this.isLocked = false;
  };
}
