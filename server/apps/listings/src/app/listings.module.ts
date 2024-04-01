import { Module } from '@nestjs/common';

import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';

@Module({
  imports: [],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class AppModule { }
