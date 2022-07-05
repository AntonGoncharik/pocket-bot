import { Injectable } from '@nestjs/common';
import ITelegramBot from 'node-telegram-bot-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');

import { UsersService } from '@users/users.service';
import { PocketService } from '@pocket/pocket.service';
import { START_REGEXP, INPUT_REGEXP, WEBSITE_REGEXP } from './bot.constant';

@Injectable()
export class BotService {
  private bot: ITelegramBot;

  constructor(
    private usersService: UsersService,
    private pocketService: PocketService,
  ) {
    this.start = this.start.bind(this);
    this.input = this.input.bind(this);

    this.init();
  }

  private init(): void {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    this.bot.onText(START_REGEXP, this.start);
    this.bot.onText(INPUT_REGEXP, this.input);
  }

  async sendMessage(chatId: number, message: string) {
    await this.bot.sendMessage(chatId, message);
  }

  async start(msg: ITelegramBot.Message) {
    try {
      const chatId = msg.chat.id;

      const user = await this.usersService.getUserByChatId(chatId);
      const redirectUri = this.pocketService.getRedirectUri(chatId);
      const requestToken = await this.pocketService.getRequestToken(
        redirectUri,
      );
      const authUri = this.pocketService.getAuthUri(requestToken, redirectUri);
      if (!user) {
        await this.usersService.create(chatId, requestToken);
        await this.sendMessage(chatId, 'User has been created');
      }
      await this.sendMessage(
        chatId,
        'For authorization, please follow the link',
      );
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
          'You are not authorized, please type /start',
        );
        return;
      }

      const isWebsite = new RegExp(WEBSITE_REGEXP).test(text);

      if (!isWebsite) {
        await this.sendMessage(
          chatId,
          'This is not a website, please enter another link',
        );
        return;
      }

      await this.pocketService.add(text, user.access_token);
      await this.sendMessage(chatId, 'New website has been added');
    } catch (error) {
      throw error;
    }
  }
}
