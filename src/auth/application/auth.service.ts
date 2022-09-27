import { Inject, Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../domain/dto/auth-credentials.dto';
import { User } from '../domain/user.entity';
import { UsersRepositoryService } from '../domain/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepositoryService)
    private readonly usersRepositoryService: UsersRepositoryService,
  ) {}

  singUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.usersRepositoryService.createUser(authCredentialsDto);
  }
}
