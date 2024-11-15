import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionHandler } from '../common/helpers';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('RolesService');

  constructor(private prisma: PrismaService) {}

  async findRole(term: string) {
    const role = await this.prisma.roles.findFirst({
      where: {
        OR: [{ id: term }, { name: term }],
      },
    });

    return role;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const { name, description } = createRoleDto;

      const roleExist = await this.findRole(name);

      if (!!roleExist) {
        throw new BadRequestException(`Role with name: ${name}, already exist`);
      }

      const role = await this.prisma.roles.create({
        data: {
          name,
          description,
        },
      });

      return { role };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async findAllRoles() {
    try {
      const roles = await this.prisma.roles.findMany();

      return { roles };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async findOneRoleByTerm(term: string) {
    try {
      const role = await this.findRole(term);

      if (!role) {
        throw new BadRequestException(`Role with id/name: ${term} not found`);
      }

      return { role };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const findRole = await this.findRole(id);

      const { name, ...data } = updateRoleDto;

      if (!findRole) {
        throw new BadRequestException(`Role with id: ${id} not found`);
      }

      if (!!name) {
        const roleWithSameName = await this.prisma.roles.findFirst({
          where: { name },
        });

        if (roleWithSameName && roleWithSameName.id !== id) {
          throw new BadRequestException(
            `Role with name: ${name} already exists`,
          );
        }
      }

      const roleUpdated = await this.prisma.roles.update({
        where: { id },
        data: {
          name,
          ...data,
        },
      });

      return {
        role: { ...roleUpdated },
      };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async removeRole(id: string) {
    try {
      const role = await this.findRole(id);

      if (!role) {
        throw new BadRequestException(`Role with id: ${id} not found`);
      }

      await this.prisma.roles.delete({
        where: { id },
      });

      return {
        status: 200,
        message: 'ok',
      };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
