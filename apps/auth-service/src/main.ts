import { Custom, SERVICES, SERVICES_PORT } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.setGlobalPrefix("api");
  await app.listen(SERVICES_PORT.AUTH_SERVICE);
  Custom.ConsolePortRunning(SERVICES.AUTH_SERVICE)

}
bootstrap();
