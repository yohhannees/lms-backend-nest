/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthController } from './auth.controller';
import { EmailService } from './email.service';
import { UserService } from './user.service';
import { Course } from 'src/schema/course/course.entity';
import { CourseController } from 'src/schema/course/course.controller';
import { CourseService } from 'src/schema/course/course.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course])],
  controllers: [AuthController, CourseController],
  providers: [UserService, EmailService, CourseService],
})
export class AuthModule {}
