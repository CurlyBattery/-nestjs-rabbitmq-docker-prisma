import { RmqModuleOptions } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';

export const rmqModuleAsyncOptions = (
  names: RmqModuleOptions[],
): ClientsModuleAsyncOptions => {
  return names.map((name) => {
    return {
      name: name.name,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBIT_MQ_URI')],
          queue: configService.get<string>(`RABBIT_MQ_${name.name}_QUEUE`),
        },
      }),
      inject: [ConfigService],
    };
  });
};
