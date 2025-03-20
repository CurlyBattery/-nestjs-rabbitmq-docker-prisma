import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { RmqModule } from '@app/common';
import { CONSUMER_SERVICE, MAILER_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CONSUMER_QUEUE: Joi.string().required(),
        RABBIT_MQ_MAILER_QUEUE: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/producer/.env',
    }),
    RmqModule.registerAsync([
      {
        name: CONSUMER_SERVICE,
      },
      {
        name: MAILER_SERVICE,
      },
    ]),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
