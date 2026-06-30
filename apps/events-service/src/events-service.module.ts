import { Module } from '@nestjs/common';
import { EventsServiceController } from './events-service.controller';
import { EventsServiceService } from './events-service.service';
import { KAFKA_GROUPS, KafkaModule } from '@app/kafka';
import { DatabaseModule } from '@app/database';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    KafkaModule.register(KAFKA_GROUPS.EVENT_SERVICE_NAME),
    DatabaseModule,
    JwtModule,
  ],
  controllers: [EventsServiceController],
  providers: [EventsServiceService],
})
export class EventsServiceModule {}
