import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import 'dotenv/config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  public db: NodePgDatabase<typeof schema>;
  private readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool, { schema });
    console.info('Database connected');
  }

  get schema() {
    return schema;
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
