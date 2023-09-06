import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
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

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: {
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
