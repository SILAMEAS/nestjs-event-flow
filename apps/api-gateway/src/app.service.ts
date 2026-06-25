import { SERVICES, SERVICES_PORT } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `${SERVICES.API_GATEWAY} is running on port http://localhost:${SERVICES_PORT.API_GATEWAY}`
  }
}
