import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('RolesService');

  constructor(private prisma: PrismaService) {}

  async findRole(name: string) {
    const role = await this.prisma.roles.findFirst({
      where: { name },
    });

    return role;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const { name, description } = createRoleDto;

      const roleExist = await this.findRole(name);

      if (roleExist) {
        throw new BadRequestException(`Role with name: ${name}, already exist`);
      }

      const role = await this.prisma.roles.create({
        data: {
          name,
          description,
        },
      });

      return role;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAllRoles() {
    return;
  }

  async findOneRole(id: string) {
    return `This action returns a #${id} role`;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async removeRole(id: string) {
    return `This action removes a #${id} role`;
  }
}
