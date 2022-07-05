import { Module } from '@nestjs/common';

import { BotService } from './bot.service';
import { UsersModule } from '@users/users.module';
import { PocketModule } from '@pocket/pocket.module';

@Module({
  providers: [BotService],
  imports: [UsersModule, PocketModule],
  exports: [BotService],
})
export class BotModule {}
