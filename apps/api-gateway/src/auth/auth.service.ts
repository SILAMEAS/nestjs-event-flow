import { Injectable } from '@nestjs/common';
import { ENV, toUrlByPort } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { handleError } from '@app/common/errors/handleError';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = `${toUrlByPort(ENV.AUTH_SERVICE_PORT)}/auth`;
  constructor(private readonly httpService: HttpService) {}
  async register(data: { email: string; password: string; name: string }) {
    try {
      const res = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/register`, data),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    } catch (err: any) {
      handleError(err);
    }
  }
  async login(data: { email: string; password: string }) {
    try {
      const res = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/login`, data),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    } catch (err: any) {
      handleError(err);
    }
  }
  async getProfile(authorization: string) {
    try {
      const res = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/profile`, {
          headers: {
            Authorization: authorization,
          },
        }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    } catch (err: any) {
      handleError(err);
    }
  }
}
