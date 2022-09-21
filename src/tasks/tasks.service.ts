import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;

    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((element) => element.id === id);
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): ITask {
    const index = this.tasks.findIndex((element) => element.id === id);

    let task: ITask = this.tasks[index];

    const { title, description } = updateTaskDto;

    task = {
      ...task,
      title,
      description,
    };

    this.tasks[index] = task;

    return task;
  }

  deleteTask(id: string) {
    const result = {
      success: true,
      message: '',
    };

    const index = this.tasks.findIndex((element) => element.id === id);

    if (index === -1) {
      result.success = false;
      result.message = 'Record not found.';
      return result;
    }

    this.tasks = this.tasks.filter((element) => element.id !== id);
    return result;
  }
}
