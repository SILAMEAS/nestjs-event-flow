import { Custom, ENV } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/logger/http-exception/http.exception.filter';
import { LoggerInterceptor } from '@app/common/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
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
  await app.listen(ENV.AUTH_SERVICE_PORT);
  Custom.ConsolePortRunning({
    name: ENV.AUTH_SERVICE_NAME,
    port: ENV.AUTH_SERVICE_PORT,
  });
}
bootstrap();
