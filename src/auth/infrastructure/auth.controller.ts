import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { AuthCredentialsDto } from '../domain/dto/auth-credentials.dto';
import { User } from '../domain/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.singUp(authCredentialsDto);
  }
}
