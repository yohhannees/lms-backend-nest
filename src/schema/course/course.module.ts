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
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';
import { UserService } from 'src/auth/user.service';
import { AuthController } from 'src/auth/auth.controller';
import { EmailService } from 'src/auth/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Thumbnail, User]),
    ThumbnailModule,
    AuthModule,
  ],
  controllers: [CourseController, ThumbnailController, AuthController],
  providers: [ThumbnailService, CourseService, UserService, EmailService],
})
export class CourseModule {}
