import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.enums';
import { Task } from './task.entity';

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
}

// exampleQueryBuilder() {
//   return this.dataSource
//       .getRepository(Person)
//       .createQueryBuilder() ...
// }
