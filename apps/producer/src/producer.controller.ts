import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('place-order')
  async createOrder(@Body() request: CreateOrderDto) {
    return this.producerService.createOrder(request);
  }

  @Get()
  async getOrders() {
    return this.producerService.getOrders();
  }
}
