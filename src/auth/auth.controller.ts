import { Controller, Get, Redirect, Query } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Redirect()
  auth(@Query() query: { chat_id: string }) {
    return this.authService.auth(query.chat_id);
  }
}
