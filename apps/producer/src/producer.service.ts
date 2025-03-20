import { Inject, Injectable, Logger } from '@nestjs/common';
import { CONSUMER_SERVICE, MAILER_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(
    @Inject(CONSUMER_SERVICE) private consumerClient: ClientProxy,
    @Inject(MAILER_SERVICE) private mailerClient: ClientProxy,
  ) {}

  createOrder(request: CreateOrderDto) {
    this.consumerClient.emit('placed-order', request);

    this.mailerClient.emit('placed-order-notification', request);

    return { message: 'Placed Order' };
  }

  getOrders(): Observable<string> {
    return this.consumerClient.send<string, object>(
      { cmd: 'fetch-orders' },
      {},
    );
  }
}
