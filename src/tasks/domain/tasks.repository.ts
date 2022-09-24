import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.enums';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksRepositoryService {
  constructor(private dataSource: DataSource) {}

  findOne(options: FindOneOptions<Task>) {
    return this.dataSource.getRepository(Task).findOne(options);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.dataSource.getRepository(Task).create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.dataSource.getRepository(Task).save(task);

    return task;
  }

  public get repository(): Repository<Task> {
    return this.dataSource.getRepository(Task);
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
      ...(title ? {title:title}:{}),
      ...(description ? {description:description}:{}),
    })
    .where("id = :id", { id: id })
    .execute()

    return retult;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    const result = await this.dataSource.getRepository(Task).delete(id);
    return result;

    // const result = await this.dataSource
    //   .getRepository(Task)
    //   .createQueryBuilder()
    //   .delete()
    //   .where('id = :id', { id: id })
    //   .execute();
    // return result;
  }
}

// exampleQueryBuilder() {
//   return this.dataSource
//       .getRepository(Person)
//       .createQueryBuilder() ...
// }
