import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { RmqModule, RmqModuleOptions } from '@app/common';
import { CONSUMER_SERVICE, MAILER_SERVICE } from './constants/services';
import { ClientsModule, Transport } from '@nestjs/microservices';

const Names: RmqModuleOptions[] = [
  {
    name: CONSUMER_SERVICE,
  },
  {
    name: MAILER_SERVICE,
  },
];

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
    ClientsModule.registerAsync([
      {
        name: CONSUMER_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: configService.get<string>(
              `RABBIT_MQ_${CONSUMER_SERVICE}_QUEUE`,
            ),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: MAILER_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: configService.get<string>(
              `RABBIT_MQ_${MAILER_SERVICE}_QUEUE`,
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
