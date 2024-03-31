/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThumbnailController } from './thumbnail.controller';
import { Thumbnail } from './thumbnail.entity';
import { ThumbnailService } from './thumbnail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Thumbnail])],
  controllers: [ThumbnailController],
  providers: [ThumbnailService],
  exports: [ThumbnailService],
})
export class ThumbnailModule {}
