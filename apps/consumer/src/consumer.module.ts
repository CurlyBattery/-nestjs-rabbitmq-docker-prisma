import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { PrismaModule } from './prisma/prisma.module';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CONSUMER_QUEUE: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        PRISMA_MIGRATION_NAME: Joi.string(),
      }),
      envFilePath: './apps/consumer/.env',
    }),
    PrismaModule,
    RmqModule,
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
