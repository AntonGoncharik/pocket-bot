import { Injectable, BadRequestException } from '@nestjs/common';

import { UsersService } from '@users/users.service';
import { BotService } from '@bot/bot.service';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.POCKET_OAUTH_HOST,
  headers: {
    'Content-Type': 'application/json',
    'X-Accept': 'application/json',
  },
});

export const apiPost = (path: string, body: any, params: any = {}) => {
  return axiosInstance.post(path, JSON.stringify(body), params);
};

@Injectable()
export class PocketService {
  constructor(
    private usersService: UsersService,
    private botService: BotService,
  ) {}

  async auth(chatId: string) {
    try {
      const user = await this.usersService.getUserByChatId(+chatId);

      if (!user) {
        throw new BadRequestException();
      }

      const accessToken = await this.getAccessToken(user.request_token);
      await this.usersService.update(+chatId, accessToken);
      await this.botService.sendMessage(+chatId, 'Now you can save any sites');

      return { url: process.env.TELEGRAM_BOT_HOST };
    } catch (error) {
      throw error;
    }
  }

  async getRequestToken(redirectUri: string): Promise<string> {
    try {
      const { data } = await apiPost('request', {
        consumer_key: process.env.POCKET_CONSUMER_KEY,
        redirect_uri: `${redirectUri}`,
      });

      return data.code;
    } catch (error) {
      throw error;
    }
  }

  async getAccessToken(requestToken: string): Promise<string> {
    try {
      const { data } = await apiPost('authorize', {
        consumer_key: process.env.POCKET_CONSUMER_KEY,
        code: `${requestToken}`,
      });

      return data.accessToken;
    } catch (error) {
      throw error;
    }
  }

  getRedirectUri(chatId: number): string {
    return `${process.env.HOST}/auth?chat_id=${chatId}`;
  }

  getAuthUri(requestToken: string, redirectUri: string): string {
    return `${process.env.POCKET_AUTHORIZE_HOST}?request_token=${requestToken}&redirect_uri=${redirectUri}`;
  }
}
