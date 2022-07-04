import { Module } from '@nestjs/common';

import { PocketService } from './pocket.service';
import { PocketController } from './pocket.controller';
import { UsersModule } from '@users/users.module';
import { BotModule } from '@bot/bot.module';

@Module({
  providers: [PocketService],
  exports: [PocketService],
  controllers: [PocketController],
  imports: [UsersModule, BotModule],
})
export class PocketModule {}
