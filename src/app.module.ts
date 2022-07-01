import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PocketModule } from './pocket/pocket.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [UsersModule, DatabaseModule, PocketModule, BotModule],
})
export class AppModule {}
