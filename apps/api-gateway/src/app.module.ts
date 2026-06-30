import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, EventsModule],
})
export class AppModule {}
