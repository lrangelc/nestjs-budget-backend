/* eslint-disable hexagonal-architecture/enforce */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './infrastructure/tasks.controller';
import { TasksService } from './application/tasks.service';
import { TasksRepositoryService } from './domain/tasks.repository';
import { Task } from './domain/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  providers: [TasksService, TasksRepositoryService],
  controllers: [TasksController],
})
export class TasksModule {}
