import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Task } from './task.entity';
import { TaskStatus } from './task.enums';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/domain/user.entity';

@Injectable()
export class TasksRepositoryService {
  constructor(private dataSource: DataSource) {}

  public get repository(): Repository<Task> {
    return this.dataSource.getRepository(Task);
  }

  findOne(options: FindOneOptions<Task>) {
    return this.dataSource.getRepository(Task).findOne(options);
  }

  async getTasks(user: User, filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    if (!status && !search) {
      return this.dataSource
        .getRepository(Task)
        .createQueryBuilder()
        .where({ user })
        .getMany();
    }

    let tasks: Task[];

    if (status && search) {
      tasks = await this.dataSource
        .getRepository(Task)
        .createQueryBuilder()
        .where({ user })
        .andWhere('status = :status', { status: status })
        .andWhere(
          `(LOWER(title) LIKE LOWER(:search) OR LOWER(description) LIKE LOWER(:search))`,
          {
            search: `%${search}%`,
          },
        )
        .getMany();

      return tasks;
    }

    if (status) {
      tasks = await this.dataSource
        .getRepository(Task)
        .createQueryBuilder()
        .where({ user })
        .andWhere('status = :status', { status: status })
        .getMany();
    }

    if (search) {
      tasks = await this.dataSource
        .getRepository(Task)
        .createQueryBuilder()
        .where({ user })
        .andWhere(
          `LOWER(title) LIKE LOWER(:search) OR LOWER(description) LIKE LOWER(:search)`,
          {
            search: `%${search}%`,
          },
        )
        .getMany();
    }

    return tasks;
  }

  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.dataSource.getRepository(Task).create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.dataSource.getRepository(Task).save(task);

    return task;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    const { title, description } = updateTaskDto;

    const retult = await this.dataSource
      .createQueryBuilder()
      .update(Task)
      .set({
        ...(title ? { title: title } : {}),
        ...(description ? { description: description } : {}),
      })
      .where('id = :id', { id: id })
      .execute();

    return retult;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    const result = await this.dataSource.getRepository(Task).delete(id);
    return result;
  }
}
