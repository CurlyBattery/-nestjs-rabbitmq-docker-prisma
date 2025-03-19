import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CONSUMER'));
  await app.startAllMicroservices();
}
bootstrap();
