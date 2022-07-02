import { Module } from '@nestjs/common';

import { BotService } from './bot.service';
import { UsersModule } from '@users/users.module';

@Module({
  providers: [BotService],
  imports: [UsersModule],
})
export class BotModule {}
