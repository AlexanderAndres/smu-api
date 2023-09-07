import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    email: string,
    passwordHash: string,
    name: string,
    lastname: string,
    rut: string,
    roleId: string,
  ): Promise<User> {
    const password = await hash(passwordHash, 13);
    return await this.prisma.user.create({
      data: { email, password, name, lastname, rut, roleId },
    });
  }

  // async getUser(email: string): Promise<User> {
  //   return await this.prisma.user.findUnique({
  //     where: { email: email },
  //   });
  // }

  async getUser(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      select: {
        name: true,
        lastname: true,
        rut: true,
        email: true,
        password: true,
        roleId: true,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    return { ...user, role: user.role.roleName };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        name: true,
        lastname: true,
        rut: true,
        email: true,
        password: false,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    return users.map((user) => ({
      ...user,
      role: user.role.roleName,
    }));
  }
}
