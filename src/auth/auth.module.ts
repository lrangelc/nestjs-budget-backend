import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './infrastructure/auth.controller';
import { AuthService } from './application/auth.service';
import { User } from './domain/user.entity';
import { UsersRepositoryService } from './domain/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersRepositoryService],
  controllers: [AuthController],
})
export class AuthModule {}
