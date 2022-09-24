import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './domain/task.entity';
import { TasksController } from './infrastructure/tasks.controller';
import { TasksRepositoryService } from './domain/tasks.repository';
import { TasksService } from './application/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepositoryService],
})
export class TasksModule {}
