import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from '../domain/dto/auth-credentials.dto';
import { User } from '../domain/user.entity';
import { UsersRepositoryService } from '../domain/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepositoryService)
    private readonly usersRepositoryService: UsersRepositoryService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.usersRepositoryService.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepositoryService.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check upir login credentials');
    }
  }
}
