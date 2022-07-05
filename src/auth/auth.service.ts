import { Injectable, BadRequestException } from '@nestjs/common';

import { UsersService } from '@users/users.service';
import { BotService } from '@bot/bot.service';
import { PocketService } from '@pocket/pocket.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private botService: BotService,
    private pocketService: PocketService,
  ) {}

  async auth(chatId: string) {
    try {
      if (!chatId) {
        throw new BadRequestException('Chat ID is not provided');
      }

      const user = await this.usersService.getUserByChatId(+chatId);

      if (!user) {
        await this.botService.sendMessage(
          +chatId,
          'User does not exist, please type /start',
        );
      }

      const accessToken = await this.pocketService.getAccessToken(
        user.request_token,
      );
      await this.usersService.update(+chatId, accessToken);
      await this.botService.sendMessage(
        +chatId,
        'Now you can save any websites, just put any link and send it',
      );

      return { url: process.env.TELEGRAM_BOT_HOST };
    } catch (error) {
      throw error;
    }
  }
}
