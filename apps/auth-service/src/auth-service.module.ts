import { DatabaseModule } from '@app/database';
import { KAFKA_GROUPS, KafkaModule } from '@app/kafka';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from '@app/common/utils/middle.util';

@Module({
  imports: [KafkaModule.register(KAFKA_GROUPS.AUTH_SERVICE),DatabaseModule,PassportModule,JwtModule.register({
    secret:process.env.JWT_SECRET||"secret_jwt",
    signOptions:{
      expiresIn:'1d'
    }
  })],
  controllers: [AuthServiceController],
  providers: [AuthServiceService,JwtStrategy],
})
export class AuthServiceModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
 }
