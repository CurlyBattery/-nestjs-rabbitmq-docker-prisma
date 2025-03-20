import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Injectable()
export class MailerService {
  constructor(
    private readonly emailService: EmailService,
    private readonly rmqService: RmqService,
  ) {}

  async sendEmail(email: string, context: RmqContext) {
    await this.emailService.sendMail({
      to: email,
      subject: 'Send From Producer App',
      text: 'Order Order Order Create',
    });
  }
}
