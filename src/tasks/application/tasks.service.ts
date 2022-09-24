import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';

import { TasksRepositoryService } from '../domain/tasks.repository';
import { Task } from '../domain/task.entity';
import { CreateTaskDto } from '../domain/dto/create-task.dto';
import { UpdateTaskDto } from '../domain/dto/update-task.dto';
import { TaskStatus } from '../domain/task.enums';
import { GetTasksFilterDto } from '../domain/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../domain/dto/update-task-status.dto';

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

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    const result = await this.tasksRepositoryService.updateTask(
      id,
      updateTaskDto,
    );
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return result;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    const result = await this.tasksRepositoryService.deleteTask(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return result;
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = updateTaskStatusDto.status;

    await this.tasksRepositoryService.repository.save(task);

    return task;
  }

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
}
