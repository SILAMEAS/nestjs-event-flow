import { DatabaseModule } from '@app/database';
import { KAFKA_GROUPS, KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guards';
import { RoleGuards } from '@app/common/guards/role.guards';
import { ENV } from '@app/common';

@Module({
  imports: [
    KafkaModule.register(KAFKA_GROUPS.AUTH_SERVICE_NAME),
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: ENV.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: ENV.ACCESS_TOKEN_SECRET_EXP,
      },
    }),
  ],
  controllers: [AuthServiceController],
  providers: [
    AuthServiceService,
    JwtStrategy,
    // { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuards },
  ],
})
export class AuthServiceModule {}
