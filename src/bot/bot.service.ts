import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class BotService {
  constructor() {
    this.init();
  }

  init() {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    bot.onText(/\/start/, async (msg, match) => {
      const chatId = msg.chat.id;
      console.log(typeof chatId);
      console.log(chatId);
    });
  }
}
