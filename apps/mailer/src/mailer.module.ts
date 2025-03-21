import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { EmailModule } from './email/email.module';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CONSUMER_QUEUE: Joi.string().required(),
        RABBIT_MQ_MAILER_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/mailer/.env',
    }),
    EmailModule,
    RmqModule,
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
