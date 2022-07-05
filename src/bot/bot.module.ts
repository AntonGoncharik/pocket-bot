import { Module } from '@nestjs/common';

import { BotService } from './bot.service';
import { UsersModule } from '@users/users.module';
import { PocketModule } from '@pocket/pocket.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  providers: [BotService],
  imports: [UsersModule, PocketModule, DatabaseModule],
})
export class BotModule {}
