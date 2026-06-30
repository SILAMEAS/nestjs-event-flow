import { Injectable } from '@nestjs/common';
import { ENV } from '@app/common';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = `${ENV.HOST}${ENV.AUTH_SERVICE_PORT}`;
}
