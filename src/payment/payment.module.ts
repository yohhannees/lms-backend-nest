import { Module } from '@nestjs/common';
// import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaidCourse } from './payment.entity';
import { UserService } from 'src/auth/user.service';
import { CourseService } from 'src/schema/course/course.service';
import { User } from 'src/auth/user.entity';
import { ThumbnailService } from 'src/schema/course/thumbnail/thumbnail.service';
import { EmailService } from 'src/auth/email.service';
import { JwtService } from '@nestjs/jwt';
import { Course } from 'src/schema/course/course.entity';
import { Thumbnail } from 'src/schema/course/thumbnail/thumbnail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaidCourse, User, Course, Thumbnail])],
  controllers: [PaymentController],
  providers: [
    UserService,
    CourseService,
    ThumbnailService,
    EmailService,
    JwtService,
  ],
})
export class PaymentModule {}
