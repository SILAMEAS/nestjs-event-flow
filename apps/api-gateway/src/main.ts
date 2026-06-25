import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVICES, SERVICES_PORT } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVICES_PORT.API_GATEWAY);
}
bootstrap();
