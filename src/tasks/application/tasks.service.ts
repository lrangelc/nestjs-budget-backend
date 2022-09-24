import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from '../domain/task.entity';
import { CreateTaskDto } from '../domain/dto/create-task.dto';
import { TaskStatus } from '../domain/task.enums';
import { UpdateTaskDto } from '../domain/dto/update-task.dto';
import { GetTasksFilterDto } from '../domain/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../domain/dto/update-task-status.dto';
import { TasksRepositoryService } from '../domain/tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TasksRepositoryService)
    private readonly tasksRepositoryService: TasksRepositoryService,
  ) {}
  // @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,

  // getAllTasks(): ITask[] {
  //   return this.tasks;
  // }

  // getTasksWithFilter(filterDto: GetTasksFilterDto): ITask[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status && search) {
  //     tasks = tasks.filter((task) => {
  //       return (
  //         task.status === status &&
  //         (task.title.toLowerCase().includes(search.toLowerCase()) ||
  //           task.description.toLowerCase().includes(search.toLowerCase()))
  //       );
  //     });
  //     return tasks;
  //   }

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       return (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       );
  //     });
  //   }

  //   return tasks;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepositoryService.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepositoryService.findOne({
      where: { id: id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
  //   const task = this.getTaskById(id);

  //   task.status = updateTaskStatusDto.status;

  //   return task;
  // }

  // updateTask(id: string, updateTaskDto: UpdateTaskDto): ITask {
  //   const task = this.getTaskById(id);

  //   // const index = this.tasks.findIndex((element) => element.id === id);

  //   // let task: ITask = this.tasks[index];

  //   const { title, description } = updateTaskDto;
  //   if (title) {
  //     task.title = title;
  //   }
  //   if (description) {
  //     task.description = description;
  //   }
  //   // task = {
  //   //   ...task,
  //   //   title,
  //   //   description,
  //   // };

  //   // this.tasks[index] = task;

  //   return task;
  // }

  // deleteTask(id: string) {
  //   const task = this.getTaskById(id);

  //   const result = {
  //     success: true,
  //     message: '',
  //   };

  //   const index = this.tasks.findIndex((element) => element.id === task.id);

  //   if (index === -1) {
  //     result.success = false;
  //     result.message = 'Record not found.';
  //     return result;
  //   }

  //   this.tasks = this.tasks.filter((element) => element.id !== id);
  //   return result;
  // }
}
