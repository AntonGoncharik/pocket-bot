import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    try {
      this.pool = new Pool({
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
      });
    } catch (error) {
      throw error;
    }
  }

  async query(query: string, values: any[] = []): Promise<any[]> {
    try {
      const response = await this.pool.query(query, values);

      return response.rows;
    } catch (error) {
      throw error;
    }
  }
}
