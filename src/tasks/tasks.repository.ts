import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

import { Task } from './task.entity';

@Injectable()
export class TasksRepositoryService {
  constructor(private dataSource: DataSource) {}

  findOne(options: FindOneOptions<Task>) {
    return this.dataSource.getRepository(Task).findOne(options);
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
