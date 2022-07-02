import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@database/database.service';
import {
  CREATE_QUERY,
  GET_USER_BY_TELEGRAM_ID_QUERY,
} from './users.repository';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(telegramId: number) {
    try {
      const user = await this.databaseService.query(CREATE_QUERY, [telegramId]);
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async getUserByTelegramId(telegramId: number) {
    try {
      const user = await this.databaseService.query(
        GET_USER_BY_TELEGRAM_ID_QUERY,
        [telegramId],
      );
      return user[0];
    } catch (error) {
      throw error;
    }
  }
}
