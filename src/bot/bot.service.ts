import { Injectable } from '@nestjs/common';
import ITelegramBot from 'node-telegram-bot-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');

import { UsersService } from '@users/users.service';
import { PocketService } from '@pocket/pocket.service';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class BotService {
  private bot: ITelegramBot;

  constructor(
    private usersService: UsersService,
    private pocketService: PocketService,
    private databaseService: DatabaseService,
  ) {
    this.start = this.start.bind(this);
    this.input = this.input.bind(this);

    this.init();
  }

  private init(): void {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    this.bot.onText(/\/start/, this.start);
    this.bot.onText(/.+/, this.input);
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

  async input(msg: ITelegramBot.Message) {
    try {
      const chatId = msg.chat.id;
      const { text } = msg;

      const user = await this.usersService.getUserByChatId(chatId);

      if (!user || !user?.access_token) {
        await this.sendMessage(
          chatId,
          'You are not authorized, please try again',
        );
        return;
      }

      const isSite = new RegExp(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      ).test(text);

      if (!isSite) {
        await this.sendMessage(chatId, 'This is not a site, please try again');
        return;
      }

      await this.pocketService.add(text, user.access_token);
      await this.sendMessage(chatId, 'New site has been added');
    } catch (error) {
      throw error;
    }
  }
}
