import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.model';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    const saltOrRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRound);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }
}
