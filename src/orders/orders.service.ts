import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionHandler } from 'src/common/helpers';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const newOrder = await this.prisma.orders.create({
        data: {
          ...createOrderDto,
        },
      });
      return { order: newOrder };
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  async findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return { order: updateOrderDto };
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
