import { ENV } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `${ENV.API_GATEWAY_NAME} is running on port http://localhost:${ENV.API_GATEWAY}`;
  }
}
