import { Injectable } from '@nestjs/common';
import ITelegramBot from 'node-telegram-bot-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');

import { UsersService } from '@users/users.service';
import { PocketService } from '@pocket/pocket.service';

@Injectable()
export class BotService {
  private bot: ITelegramBot;

  constructor(
    private usersService: UsersService,
    private pocketService: PocketService,
  ) {
    this.start = this.start.bind(this);

    this.init();
  }

  init(): void {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    this.bot.onText(/\/start/, this.start);
  }

  async sendMessage(chatId: number, message: string) {
    await this.bot.sendMessage(chatId, message);
  }

  async start(msg: ITelegramBot.Message) {
    try {
      const chatId = msg.chat.id;

      const user = await this.usersService.getUserByChatId(chatId);
      if (user) {
        await this.sendMessage(chatId, 'user exists, you can save any sites');
        return;
      }

      const redirectUri = this.pocketService.getRedirectUri(chatId);
      const requestToken = await this.pocketService.getRequestToken(
        redirectUri,
      );
      const authUri = this.pocketService.getAuthUri(requestToken, redirectUri);
      await this.usersService.create(chatId, requestToken);
      await this.sendMessage(chatId, authUri);
    } catch (error) {
      throw error;
    }
  }
}
