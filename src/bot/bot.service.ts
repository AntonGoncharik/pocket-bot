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

  async sendMessage(telegramId: number, message: string) {
    await this.bot.sendMessage(telegramId, message);
  }

  async start(msg: ITelegramBot.Message, match: RegExpExecArray | null) {
    try {
      const telegramId = msg.chat.id;
      console.log(match);
      const user = await this.usersService.getUserByTelegramId(telegramId);
      if (user) {
        await this.sendMessage(telegramId, 'user exists');
        // return;
      }

      const redirectUri = this.pocketService.getRedirectUri(telegramId);
      const requestToken = await this.pocketService.getRequestToken(
        redirectUri,
      );
      const authUri = this.pocketService.getAuthUri(requestToken, redirectUri);
      await this.sendMessage(telegramId, authUri);
      // await this.usersService.create(telegramId);
    } catch (error) {
      throw error;
    }
  }
}
