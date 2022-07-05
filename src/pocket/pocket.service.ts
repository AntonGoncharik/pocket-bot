import { Injectable, BadRequestException } from '@nestjs/common';

import { UsersService } from '@users/users.service';
// import { BotService } from '@bot/bot.service';
import { HttpService } from '@http/http.service';
import {
  RequestTokenBody,
  RequestTokenResponse,
  AccessTokenBody,
  AccessTokenResponse,
  AddBody,
  AddResponse,
} from './pocket.interface';

@Injectable()
export class PocketService {
  constructor(
    private usersService: UsersService,
    // private botService: BotService,
    private httpService: HttpService,
  ) {}

  async auth(chatId: string) {
    try {
      const user = await this.usersService.getUserByChatId(+chatId);

      if (!user) {
        throw new BadRequestException();
      }

      const accessToken = await this.getAccessToken(user.request_token);

      await this.usersService.update(+chatId, accessToken);

      // await this.botService.sendMessage(+chatId, 'Now you can save any sites');

      return { url: process.env.TELEGRAM_BOT_HOST };
    } catch (error) {
      throw error;
    }
  }

  async getRequestToken(redirectUri: string): Promise<string> {
    try {
      const { code } = await this.httpService.post<
        RequestTokenBody,
        RequestTokenResponse
      >('v3/oauth/request', {
        consumer_key: process.env.POCKET_CONSUMER_KEY,
        redirect_uri: `${redirectUri}`,
      });

      return code;
    } catch (error) {
      throw error;
    }
  }

  async getAccessToken(requestToken: string): Promise<string> {
    try {
      const { access_token: accessToken } = await this.httpService.post<
        AccessTokenBody,
        AccessTokenResponse
      >('v3/oauth/authorize', {
        consumer_key: process.env.POCKET_CONSUMER_KEY,
        code: `${requestToken}`,
      });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  getRedirectUri(chatId: number): string {
    return `${process.env.HOST}/auth?chat_id=${chatId}`;
  }

  getAuthUri(requestToken: string, redirectUri: string): string {
    return `${process.env.POCKET_HOST}/auth/authorize?request_token=${requestToken}&redirect_uri=${redirectUri}`;
  }

  async add(url: string, accessToken: string): Promise<void> {
    try {
      await this.httpService.post<AddBody, AddResponse>('v3/add', {
        url,
        consumer_key: process.env.POCKET_CONSUMER_KEY,
        access_token: `${accessToken}`,
      });
    } catch (error) {
      throw error;
    }
  }
}
