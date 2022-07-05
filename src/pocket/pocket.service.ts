import { Injectable } from '@nestjs/common';

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
  constructor(private httpService: HttpService) {}

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
