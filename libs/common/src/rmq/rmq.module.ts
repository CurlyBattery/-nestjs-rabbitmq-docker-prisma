import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';
import { ConfigService } from '@nestjs/config';
import { rmqModuleAsyncOptions } from '@app/common/rmq/config/rmq-module-async-options';

export interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }

  static async registerAsync(
    names: RmqModuleOptions[],
  ): Promise<DynamicModule> {
    return {
      module: RmqModule,
      imports: [ClientsModule.registerAsync(rmqModuleAsyncOptions(names))],
      exports: [ClientsModule],
    };
  }
}
