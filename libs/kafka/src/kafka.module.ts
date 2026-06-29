import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  KAFKA_BROKER,
  KAFKA_CLIENT_ID,
  KAFKA_CONSUMER_GROUP,
} from './constants/kafka.constants';
import { SERVICES } from '@app/common';

export const KAFKA_SERVICE = 'KAFKA_SERVICE';
export const KAFKA_GROUPS = Object.fromEntries(
  Object.entries(SERVICES).map(([key, value]) => [key, `${value}-group`]),
) as {
  [K in keyof typeof SERVICES]: `${(typeof SERVICES)[K]}-group`;
};

@Module({})
export class KafkaModule {
  static register(consumerGroup?: string): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: KAFKA_SERVICE,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: KAFKA_CLIENT_ID,
                brokers: [KAFKA_BROKER],
              },
              consumer: {
                groupId: consumerGroup ?? KAFKA_CONSUMER_GROUP,
              },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
