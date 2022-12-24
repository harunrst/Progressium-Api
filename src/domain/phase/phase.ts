import { IEventBus } from "../../common/interfaces/IEventBus";
import { InMemoryEventBus } from "../../persistence/eventBus";
import { Task } from "../task/task";
import * as PhaseConstants from "./constants";
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
    this.controlStatus();
  };

  completeTask = (taskId: string) => {
    if (this.isLocked) {
      throw new Error(PhaseConstants.Validations.PhaseIsLocked);
    }
    var task = this.tasks.find((t) => t.id == taskId)?.getInstance();
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

  undoTask = (taskId: string) => {
    if (this.isLocked) {
      throw new Error(PhaseConstants.Validations.PhaseIsLocked);
    }
    var task = this.tasks.find((t) => t.id == taskId)?.getInstance();
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

    this.controlStatus();
  };

  private controlStatus = () => {
    var isDone = this.tasks.every((t) => t.isDone);
    if (isDone !== this.isDone) {
      this.isDone = isDone;
      const eventBus = InMemoryEventBus.getInstance() as IEventBus;
      eventBus.emit(
        this.isDone
          ? PhaseConstants.EventNames.PhaseCompleted
          : PhaseConstants.EventNames.PhaseUncompleted,
        this.name
      );
    }
  };

  lock = () => {
    this.isLocked = true;
  };

  unlock = () => {
    this.isLocked = false;
  };
}
