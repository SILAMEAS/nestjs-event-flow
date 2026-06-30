import { Custom, SERVICES, SERVICES_PORT } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { LoggerInterceptor } from '@app/common/logger/logger.interceptor';
import { HttpExceptionFilter } from '@app/common/logger/http-exception/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(SERVICES_PORT.AUTH_SERVICE);
  Custom.ConsolePortRunning(SERVICES.AUTH_SERVICE);
}
bootstrap();
