import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PocketModule } from './pocket/pocket.module';
import { BotModule } from './bot/bot.module';
import { HttpService } from './http/http.service';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, DatabaseModule, PocketModule, BotModule, HttpModule, AuthModule],
  providers: [HttpService],
})
export class AppModule {}
