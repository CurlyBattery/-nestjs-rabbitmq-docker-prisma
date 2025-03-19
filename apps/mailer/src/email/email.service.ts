import { Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor() {
    this.nodemailerTransport = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'cosinusgradusov90@gmail.com',
        pass: 'eswclunnqqruqkov',
      },
    });
  }

  public sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
