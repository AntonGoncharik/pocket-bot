import { Module } from '@nestjs/common';

import { PocketService } from './pocket.service';
import { HttpModule } from '@http/http.module';

@Module({
  providers: [PocketService],
  exports: [PocketService],
  imports: [HttpModule],
})
export class PocketModule {}
