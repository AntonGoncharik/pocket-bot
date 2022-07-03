import { Injectable } from '@nestjs/common';

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

      return data;
    } catch (error) {
      throw error;
    }
  }

  getRedirectUri(telegramId: number): string {
    return `${process.env.HOST}?telegram_id=${telegramId}`;
  }

  getAuthUri(requestToken: string, redirectUri: string): string {
    return `${process.env.POCKET_AUTHORIZE_HOST}?request_token=${requestToken}&redirect_uri=${redirectUri}`;
  }
}
