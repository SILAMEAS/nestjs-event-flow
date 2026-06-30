import { Custom, ENV } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from '@app/common/logger/logger.interceptor';
import { HttpExceptionFilter } from '@app/common/logger/http-exception/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(ENV.API_GATEWAY_PORT);
  Custom.ConsolePortRunning(ENV.HOST + ENV.API_GATEWAY_PORT);
}
bootstrap();
