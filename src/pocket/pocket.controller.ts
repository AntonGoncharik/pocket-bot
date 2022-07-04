import { Controller, Get, Redirect, Query } from '@nestjs/common';

import { PocketService } from './pocket.service';

@Controller('auth')
export class PocketController {
  constructor(private pocketService: PocketService) {}

  @Get()
  @Redirect()
  auth(@Query() query: { chat_id: string }) {
    return this.pocketService.auth(query.chat_id);
  }
}
