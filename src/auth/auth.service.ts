import { Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto, UpdateAuthDto } from './dto';

@Injectable()
export class AuthService {
  registerUser(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }

  loginUser(loginAuthDto: LoginAuthDto) {
    return loginAuthDto;
  }

  findAllUsers() {
    return `This action returns all auth`;
  }

  findOneUser(id: number) {
    return `This action returns a #${id} auth`;
  }

  updateUser(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth: ${updateAuthDto}`;
  }

  removeUser(id: string) {
    return `This action removes a #${id} auth`;
  }
}
