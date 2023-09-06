import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('lastname') lastname: string,
    @Body('rut') rut: string,
    @Body('role') role: string,
  ): Promise<User> {
    return await this.usersService.createUser(
      email,
      password,
      name,
      lastname,
      rut,
      role,
    );
  }
  @Get('users-list')
  async userList() {
    return this.usersService.getUsers();
  }
}
