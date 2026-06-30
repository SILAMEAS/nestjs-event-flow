import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '@app/database/schema/user';

export const eventStatusEnum = pgEnum('eventStatus', [
  'DRAF',
  'PUBLISHED',
  'CANCELED',
]);

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  capacity: integer('capacity').notNull(),
  price: integer('price').default(0).notNull(),
  status: eventStatusEnum('status').default('DRAF').notNull(),
  organizeId: uuid('organize_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export type eventStatusEnum = (typeof eventStatusEnum.enumValues)[number];
