import { Custom, SERVICES, SERVICES_PORT } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVICES_PORT.API_GATEWAY);
  Custom.ConsolePortRunning(SERVICES.API_GATEWAY)
}
bootstrap();
