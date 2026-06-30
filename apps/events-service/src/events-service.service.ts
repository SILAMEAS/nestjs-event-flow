import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  Param,
} from '@nestjs/common';
import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import { ClientKafka } from '@nestjs/microservices';
import {
  DatabaseService,
  events,
  eventStatusEnum,
  userRole,
} from '@app/database';
import { JwtService } from '@nestjs/jwt';
import { CreateEventDto, UpdateEventDto } from '@app/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsServiceService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async findAll() {
    return this.dbService.db
      .select({
        id: events.id,
        title: events.title,
        status: events.status,
        description: events.description,
        price: events.price,
      })
      .from(events)
      .where(eq(events.status, 'PUBLISHED'))
      .limit(10);
  }

  async find(@Param('id') id: string) {
    const [event] = await this.dbService.db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found!`);
    }
    return event;
  }

  async createEvent(dto: CreateEventDto, organizeId: string) {
    const [event] = await this.dbService.db
      .insert(events)
      .values({
        ...dto,
        date: new Date(dto.date),
        price: dto.price ?? 0,
        organizeId: organizeId,
      })
      .returning();
    this.kafkaClient.emit(KAFKA_TOPICS.EVENT_CREATED, {
      eventId: event.id,
      organizeId: event.organizeId,
      title: event.title,
      timestamp: new Date().toISOString(),
    });
    return event;
  }

  async updateEvent(
    eventId: string,
    data: UpdateEventDto,
    userId: string,
    userRole: userRole,
  ) {
    const event = await this.find(eventId);
    if (event.organizeId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException(`You can't perform this action`);
    }
    //  new data update
    const newDataUpdate: typeof event = {
      ...event,
      ...data,
    } as unknown as typeof event;
    if (newDataUpdate.date) {
      newDataUpdate.date = new Date(newDataUpdate.date);
    }
    newDataUpdate.updatedAt = new Date();
    const [updated] = await this.dbService.db
      .update(events)
      .set({ ...newDataUpdate, updatedAt: new Date() })
      .where(eq(events.id, eventId))
      .returning();
    // ========== KAFKA
    this.kafkaClient.emit(KAFKA_TOPICS.EVENT_UPDATED, {
      eventId: event.id,
      changes: Object.keys(data),
      timestamp: new Date().toISOString(),
    });
    return updated;
  }

  async publish(eventId: string, userId: string, userRole: userRole) {
    const updated = await this.updateStatus(
      eventId,
      userId,
      userRole,
      'PUBLISHED',
    );
    //  Kafka updated
    this.kafkaClient.emit(KAFKA_TOPICS.EVENT_UPDATED, {
      eventId: updated.id,
      organizeId: updated.organizeId,
      status: 'PUBLISHED',
      timestamp: new Date().toISOString(),
    });
    return updated;
  }
  async cancel(eventId: string, userId: string, userRole: userRole) {
    const updated = await this.updateStatus(
      eventId,
      userId,
      userRole,
      'CANCELED',
    );
    //  Kafka
    this.kafkaClient.emit(KAFKA_TOPICS.TICKET_CANCELED, {
      eventId: updated.id,
      organizeId: updated.organizeId,
      status: 'CANCELED',
      timestamp: new Date().toISOString(),
    });
    return updated;
  }

  async findMyEvents(organizeId: string) {
    return this.dbService.db
      .select()
      .from(events)
      .where(eq(events.organizeId, organizeId));
  }

  private async updateStatus(
    eventId: string,
    userId: string,
    userRole: userRole,
    status: eventStatusEnum,
  ) {
    const event = await this.find(eventId);
    if (event.organizeId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException(`You can't perform this action`);
    }
    const [updated] = await this.dbService.db
      .update(events)
      .set({ ...event, status, updatedAt: new Date() })
      .where(eq(events.id, eventId))
      .returning();

    return updated;
  }
}
