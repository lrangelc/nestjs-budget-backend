import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './domain/user.entity';
import { AuthService } from './application/auth.service';
import { UsersRepositoryService } from './domain/users.repository';
import { AuthController } from './infrastructure/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersRepositoryService],
  controllers: [AuthController],
})
export class AuthModule {}
