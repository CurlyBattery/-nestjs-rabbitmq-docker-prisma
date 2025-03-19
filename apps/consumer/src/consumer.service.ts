import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class ConsumerService {
  constructor(private readonly prisma: PrismaService) {}

  async placeOrder(dto: CreateOrderDto) {
    await this.prisma.order.create({
      data: dto,
    });
  }

  getOrders() {
    return this.prisma.order.find({});
  }
}
