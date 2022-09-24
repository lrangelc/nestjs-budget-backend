import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { Task } from '../domain/task.entity';
import { TasksRepositoryService } from '../domain/tasks.repository';
import { CreateTaskDto } from '../domain/dto/create-task.dto';
import { UpdateTaskDto } from '../domain/dto/update-task.dto';
import { GetTasksFilterDto } from '../domain/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../domain/dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TasksRepositoryService)
    private readonly tasksRepositoryService: TasksRepositoryService,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepositoryService.getTasks(filterDto);
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

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepositoryService.createTask(createTaskDto);
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
}
