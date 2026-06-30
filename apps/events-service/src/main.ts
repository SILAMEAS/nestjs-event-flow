import { NestFactory } from '@nestjs/core';
import { EventsServiceModule } from './events-service.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from '@app/common/logger/logger.interceptor';
import { HttpExceptionFilter } from '@app/common/logger/http-exception/http.exception.filter';
import { Custom, ENV } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(EventsServiceModule);
  // Enable Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // Logger
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(ENV.EVENT_SERVICE_PORT);
  Custom.ConsolePortRunning({
    name: ENV.EVENT_SERVICE_NAME,
    port: ENV.EVENT_SERVICE_PORT,
  });
}
bootstrap();
