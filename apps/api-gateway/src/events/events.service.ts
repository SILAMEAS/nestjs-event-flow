import { Injectable } from '@nestjs/common';
import { ENV } from '@app/common';

@Injectable()
export class EventsService {
  private readonly eventsServiceUrl = `${ENV.HOST}`;
}
