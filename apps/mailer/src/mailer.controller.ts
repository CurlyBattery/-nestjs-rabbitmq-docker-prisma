import { Controller, Logger } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('placed-order-notification')
  sendEmail(@Payload() dto: CreateOrderDto, @Ctx() context: RmqContext) {
    console.log(dto);
    return this.mailerService.sendEmail(dto.email, context);
  }
}
