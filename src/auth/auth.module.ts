import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@users/users.module';
import { PocketModule } from '@pocket/pocket.module';
import { BotModule } from '@bot/bot.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, PocketModule, BotModule],
})
export class AuthModule {}
