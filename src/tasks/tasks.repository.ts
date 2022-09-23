import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions } from 'typeorm';

import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(private dataSource: DataSource) {}

  findOne(options: FindOneOptions<Task>) {
    return this.dataSource.getRepository(Task).findOne(options);
  }
}

// exampleQueryBuilder() {
//   return this.dataSource
//       .getRepository(Person)
//       .createQueryBuilder() ...
// }
