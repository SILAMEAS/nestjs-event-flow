import { Custom, SERVICES, SERVICES_PORT } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/logger/http-exception/http.exception.filter';
import { LoggerInterceptor } from '@app/common/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.setGlobalPrefix('api');
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
  await app.listen(SERVICES_PORT.AUTH_SERVICE);
  Custom.ConsolePortRunning(SERVICES.AUTH_SERVICE);
}
bootstrap();
