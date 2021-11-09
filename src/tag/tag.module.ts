import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
console.log('hello');
@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
