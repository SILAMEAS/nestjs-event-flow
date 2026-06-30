import { Injectable } from '@nestjs/common';
import { CreateEventDto, ENV, toUrlByPort } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { handleError } from '@app/common/errors';
import { firstValueFrom } from 'rxjs';
import type { User } from '@app/database';

@Injectable()
export class EventsService {
  private readonly eventsServiceUrl = `${toUrlByPort(ENV.EVENT_SERVICE_PORT)}/events`;
  constructor(private readonly httpService: HttpService) {}

  createEvent(dto: CreateEventDto, user: User) {
    try {
      return firstValueFrom(
        this.httpService.post(`${this.eventsServiceUrl}`, dto, {
          headers: {
            'x-user-id': user.id,
            'x-user-role': user.role,
          },
        }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      ).then((r) => r.data);
    } catch (error) {
      handleError(error);
    }
  }
}
