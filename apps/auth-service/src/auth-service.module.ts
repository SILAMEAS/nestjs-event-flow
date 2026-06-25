import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { KAFKA_GROUPS, KafkaModule } from '@app/kafka';

@Module({
  imports: [KafkaModule.register(KAFKA_GROUPS.AUTH_SERVICE)],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule { }
