import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): ITask[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status && search) {
      tasks = tasks.filter((task) => {
        return (
          task.status === status &&
          (task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase()))
        );
      });
      return tasks;
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    return tasks;
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
    const task = this.tasks.find((element) => element.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }

    return task;
  }

  updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    const task = this.getTaskById(id);

    task.status = updateTaskStatusDto.status;

    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): ITask {
    const task = this.getTaskById(id);

    // const index = this.tasks.findIndex((element) => element.id === id);

    // let task: ITask = this.tasks[index];

    const { title, description } = updateTaskDto;
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    // task = {
    //   ...task,
    //   title,
    //   description,
    // };

    // this.tasks[index] = task;

    return task;
  }

  deleteTask(id: string) {
    const task = this.getTaskById(id);

    const result = {
      success: true,
      message: '',
    };

    const index = this.tasks.findIndex((element) => element.id === task.id);

    if (index === -1) {
      result.success = false;
      result.message = 'Record not found.';
      return result;
    }

    this.tasks = this.tasks.filter((element) => element.id !== id);
    return result;
  }
}
