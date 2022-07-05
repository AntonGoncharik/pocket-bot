import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.init();
  }

  private init() {
    this.axiosInstance = axios.create({
      baseURL: process.env.POCKET_HOST,
      headers: {
        'Content-Type': 'application/json',
        'X-Accept': 'application/json',
      },
    });
  }

  async post<Tin, Tout>(path: string, body: Tin): Promise<Tout> {
    try {
      const response = await this.axiosInstance.post(
        path,
        JSON.stringify(body),
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
