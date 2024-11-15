import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, LoginAuthDto, UpdateAuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { bcryptAdapter, envs } from '../common/config';
import { ExceptionHandler } from '../common/helpers';
import { JwtPayload } from '../common/interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  private readonly bcrypt = new bcryptAdapter();
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  defaultRoleId = envs.defaultRoleId;

  private getJwtToken(payload: JwtPayload) {
    try {
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      this.logger.error('Error generating JWT: ', error);
      throw new BadRequestException('Could not generate JWT');
    }
  }

  async findOneUserByTerm(term: string) {
    const user = this.prisma.users.findFirst({
      where: {
        OR: [{ id: term }, { name: term }, { email: term }],
      },
    });

    return user;
  }

  async registerUser(createAuthDto: CreateAuthDto) {
    try {
      const { name, email, password } = createAuthDto;
      let { roleId } = createAuthDto;

      const userExist = await this.findOneUserByTerm(email);

      if (!!userExist) {
        throw new BadRequestException(`User with email ${email} already exist`);
      }

      if (!roleId) {
        roleId = this.defaultRoleId;
      }

      const encryptedPassword = this.bcrypt.hash(password);

      const newUser = await this.prisma.users.create({
        data: {
          name,
          email,
          password: encryptedPassword,
          roleId,
        },
      });

      delete newUser.password;

      return {
        user: newUser,
      };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    try {
      const { id, name, email, password } = loginAuthDto;

      const user = await this.findOneUserByTerm(email);

      if (!user) {
        throw new BadRequestException(`User with email not found`);
      }

      const isPasswordValid = this.bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('User/Password not valid');
      }

      const token = this.getJwtToken({ id });

      return {
        token,
        user: {
          id: user.id,
          name,
          email,
        },
      };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async findAllUsers() {
    try {
      const users = await this.prisma.users.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          roleId: true,
          membership: true,
        },
      });

      return { users };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async findOneUser(id: string) {
    try {
      const user = await this.findOneUserByTerm(id);

      if (!user) {
        throw new BadRequestException(`User with id: ${id} not fund`);
      }

      delete user.password;

      return { user };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  // async updateUser(id: string, updateAuthDto: UpdateAuthDto) {
  //   try {
  //     const userExist = await this.findOneUserByTerm(id);

  //     if (!userExist) {
  //       throw new BadRequestException(`User with id: ${id} not fund`);
  //     }

  //     const userUpdated = this.prisma.users.update({
  //       where: { id },
  //       data: {
  //         ...updateAuthDto,
  //       },
  //     });

  //     return { user: { userUpdated } };
  //   } catch (error) {
  //     ExceptionHandler.handle(error);
  //   }
  // }
  async updateUser(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      const userExist = await this.findOneUserByTerm(id);

      if (!userExist) {
        throw new BadRequestException(`User with id: ${id} not found`);
      }

      // TODO: Validar el cambio de email

      const { roleId, membershipId, reservations, orders, ...otherFields } =
        updateAuthDto;

      if (!!reservations) {
        throw new BadRequestException(
          `Please update your reservations in the reservation module.`,
        );
      }

      if (!!orders) {
        throw new BadRequestException(
          `Please update your reservations in the reservation module.`,
        );
      }

      if (!!orders) {
        throw new BadRequestException(`Membership Module under construction`);
      }

      const userUpdated = await this.prisma.users.update({
        where: { id },
        data: {
          ...otherFields,
          ...(roleId ? { role: { connect: { id: roleId } } } : {}),
          ...(membershipId
            ? { membership: { connect: { id: membershipId } } }
            : {}),
        },
      });

      delete userUpdated.password;

      return { user: userUpdated };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async removeUser(id: string) {
    try {
      const userExist = await this.findOneUserByTerm(id);

      if (!userExist) {
        throw new BadRequestException(`User with id: ${id} not found`);
      }

      await this.prisma.users.delete({
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
