import { Custom, SERVICES, SERVICES_PORT } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from '@app/common/logger/logger.interceptor';
import { HttpExceptionFilter } from '@app/common/logger/http-exception/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(SERVICES_PORT.API_GATEWAY);
  Custom.ConsolePortRunning(SERVICES.API_GATEWAY);
}
bootstrap();
