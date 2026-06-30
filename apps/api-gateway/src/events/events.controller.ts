import { Body, Controller, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from '@app/common';
import { CurrentUser } from '@app/common/decorator';
import type { User } from '@app/database';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() dto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventsService.createEvent(dto, user);
  }
}
