/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../lesson/lesson.entity';
import { LessonService } from '../lesson/lesson.service';
import { Quiz } from '../quiz/quiz.entity';
import { QuizService } from '../quiz/quiz.service';
import { Unit } from '../unit/unit.entity';
import { UnitService } from '../unit/unit.service';
import { Course } from '../course/course.entity';
import { CourseService } from '../course/course.service';
import { CourseGetterController } from './getCourse.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Lesson, Quiz, Unit]), // Import entities for the repositories
  ],
  controllers: [CourseGetterController], // Include the CourseGetterController
  providers: [CourseService, LessonService, QuizService, UnitService], // Include the required services
})
export class GetCourseModule {}
