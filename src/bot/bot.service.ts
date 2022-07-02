import { Injectable, BadRequestException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');

import { UsersService } from '@users/users.service';

@Injectable()
export class BotService {
  constructor(private usersService: UsersService) {
    this.init();
  }

  init() {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    bot.onText(/\/start/, async (msg, match) => {
      try {
        const telegramId = msg.chat.id;

        const user = await this.usersService.getUserByTelegramId(telegramId);
        if (user) {
          await bot.sendMessage(telegramId, 'user exists');
          return;
        }

        await this.usersService.create(telegramId);
      } catch (error) {
        throw error;
      }
    });
  }
}
