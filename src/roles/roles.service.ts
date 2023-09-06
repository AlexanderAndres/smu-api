import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  async createRole(roleName: string): Promise<Role> {
    return await this.prisma.role.create({
      data: { roleName },
    });
  }
}
