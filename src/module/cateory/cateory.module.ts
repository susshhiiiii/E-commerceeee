import { Module } from '@nestjs/common';
import { CateoryService } from './cateory.service';
import { CateoryController } from './cateory.controller';

@Module({
  controllers: [CateoryController],
  providers: [CateoryService],
})
export class CateoryModule {}
