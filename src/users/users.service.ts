import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@database/database.service';
import {
  CREATE_QUERY,
  UPDATE_QUERY,
  GET_USER_BY_CHAT_ID_QUERY,
} from './users.repository';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(chatId: number, requestToken: string): Promise<User> {
    try {
      const user = await this.databaseService.query(CREATE_QUERY, [
        chatId,
        requestToken,
      ]);

      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async update(chatId: number, accessToken: string): Promise<User> {
    try {
      const user = await this.databaseService.query(UPDATE_QUERY, [
        accessToken,
        chatId,
      ]);

      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async getUserByChatId(chatId: number): Promise<User> {
    try {
      const user = await this.databaseService.query(GET_USER_BY_CHAT_ID_QUERY, [
        chatId,
      ]);

      return user[0];
    } catch (error) {
      throw error;
    }
  }
}
