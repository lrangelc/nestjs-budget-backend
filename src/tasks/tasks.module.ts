import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './domain/task.entity';
import { TasksService } from './application/tasks.service';
import { TasksRepositoryService } from './domain/tasks.repository';
import { TasksController } from './infrastructure/tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TasksRepositoryService],
  controllers: [TasksController],
})
export class TasksModule {}
