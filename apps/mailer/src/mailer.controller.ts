import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './email/dto/create-order.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('placed-order-notification')
  sendEmail(@Payload() dto: CreateOrderDto) {
    return this.mailerService.sendEmail(dto.email);
  }
}
