import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepositoryService } from './tasks.repository';
import { Task } from './task.entity';

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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepositoryService.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepositoryService.repository.save(task);

    return task;

    // const task: ITask = {
    //   id: uuid(),
    //   title,
    //   description,
    //   status: TaskStatus.OPEN,
    // };

    // this.tasks.push(task);

    // return task;
  }
  // createTask(createTaskDto: CreateTaskDto): ITask {
  //   const { title, description } = createTaskDto;

  //   const task: ITask = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

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
