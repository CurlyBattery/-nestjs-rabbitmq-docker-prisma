import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class MailerService {
  constructor(private readonly emailService: EmailService) {}

  async sendEmail(email: string) {
    await this.emailService.sendMail({
      to: email,
      subject: 'Send From Producer App',
      text: 'Order Order Order Create',
    });
  }
}
