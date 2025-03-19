import { Inject, Injectable, Logger } from '@nestjs/common';
import { CONSUMER_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(@Inject(CONSUMER_SERVICE) private consumerClient: ClientProxy) {}

  createOrder(request: CreateOrderDto) {
    this.consumerClient.emit('placed-order', request);

    return { message: 'Placed Order' };
  }

  getOrders() {
    return this.consumerClient.send({ cmd: 'fetch-orders' }, {});
  }
}
