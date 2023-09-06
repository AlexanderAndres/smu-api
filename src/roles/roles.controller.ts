import { Body, Controller, Post } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Post('create-role')
  async createRole(@Body('roleName') roleName: string): Promise<Role> {
    return await this.roleService.createRole(roleName);
  }
}
