import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { RmqModuleOptions } from '@app/common';
import { ConfigService } from '@nestjs/config';

const options: ClientsModuleAsyncOptions = [];

export const getOptions = async (names: RmqModuleOptions[]) => {
  for (const name of names) {
    options.push({
      name: name.name,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBIT_MQ_URI')],
          queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
        },
      }),
      inject: [ConfigService],
    });
  }
  return options;
};
