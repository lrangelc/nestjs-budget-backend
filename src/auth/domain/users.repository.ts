import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { User } from './user.entity';
import { UserStatus } from './user.enums';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class UsersRepositoryService {
  constructor(private dataSource: DataSource) {}

  public get repository(): Repository<User> {
    return this.dataSource.getRepository(User);
  }

  findOne(options: FindOneOptions<User>) {
    return this.dataSource.getRepository(User).findOne(options);
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<User[]> {
    const { status, search } = filterDto;

    if (!status && !search) {
      return this.dataSource.getRepository(User).createQueryBuilder().getMany();
    }

    let tasks: User[];

    if (status && search) {
      tasks = await this.dataSource
        .getRepository(User)
        .createQueryBuilder()
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
        .getRepository(User)
        .createQueryBuilder()
        .andWhere('status = :status', { status: status })
        .getMany();
    }

    if (search) {
      tasks = await this.dataSource
        .getRepository(User)
        .createQueryBuilder()
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

  async createTask(createTaskDto: CreateTaskDto): Promise<User> {
    const { title, description } = createTaskDto;

    const task = this.dataSource.getRepository(User).create({
      title,
      description,
      status: UserStatus.ACTIVE,
    });

    await this.dataSource.getRepository(User).save(task);

    return task;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    const { title, description } = updateTaskDto;

    const retult = await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({
        ...(title ? { title: title } : {}),
        ...(description ? { description: description } : {}),
      })
      .where('id = :id', { id: id })
      .execute();

    return retult;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    const result = await this.dataSource.getRepository(User).delete(id);
    return result;
  }
}
