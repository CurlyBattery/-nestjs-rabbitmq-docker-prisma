import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly appService: ConsumerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
