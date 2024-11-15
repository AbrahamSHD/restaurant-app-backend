import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto, UpdateAuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { bcryptAdapter, envs } from '../common/config';
import { ExceptionHandler } from 'src/common/helpers';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  private readonly bcrypt = new bcryptAdapter();
  constructor(private prisma: PrismaService) {}

  defaultRoleId = envs.defaultRoleId;

  async findOneByTerm(term: string) {
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

      const userExist = await this.findOneByTerm(email);

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
    return loginAuthDto;
  }

  async findAllUsers() {
    return `This action returns all auth`;
  }

  async findOneUser(id: number) {
    return `This action returns a #${id} auth`;
  }

  async updateUser(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth: ${updateAuthDto}`;
  }

  async removeUser(id: string) {
    return `This action removes a #${id} auth`;
  }
}
