import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EventsServiceService } from './events-service.service';
import { CreateEventDto } from '@app/common';
import { CurrentUser, Roles } from '@app/common/decorator';
import type { User } from '@app/database';

@Controller('events')
export class EventsServiceController {
  constructor(private readonly eventsServiceService: EventsServiceService) {}

  @Post()
  create(@Body() event: CreateEventDto, @CurrentUser() user: User) {
    return this.eventsServiceService.createEvent(event, user.id);
  }
  @Get('/:id')
  getEventById(@Param('id', ParseUUIDPipe) eventId: string) {
    return this.eventsServiceService.find(eventId);
  }

  @Get()
  getEvents() {
    return this.eventsServiceService.findAll();
  }
  @Get('my-events')
  getEventByUserId(@CurrentUser() user: User) {
    return this.eventsServiceService.findMyEvents(user.id);
  }

  @Roles('ADMIN')
  @Put('/:id')
  updated(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
    @Body() event: CreateEventDto,
  ) {
    return this.eventsServiceService.updateEvent(id, event, user.id, user.role);
  }

  @Put('/publish')
  publish(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.eventsServiceService.publish(id, user.id, user.role);
  }
  @Put('/cancel')
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.eventsServiceService.cancel(id, user.id, user.role);
  }
}
