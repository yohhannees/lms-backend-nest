/* eslint-disable prettier/prettier */
// course.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ThumbnailModule } from './thumbnail/thumbnail.module';
import { ThumbnailController } from './thumbnail/thumbnail.controller';
import { ThumbnailService } from './thumbnail/thumbnail.service';
import { Thumbnail } from './thumbnail/thumbnail.entity';
import { EmailService } from 'src/auth/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Thumbnail]),
    ThumbnailModule,
  ],
  controllers: [CourseController, ThumbnailController],
  providers: [ThumbnailService, CourseService, EmailService],
})
export class CourseModule {}
