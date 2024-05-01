/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { LessonService } from '../lesson/lesson.service';
import { QuizService } from '../quiz/quiz.service';
import { UnitService } from '../unit/unit.service';


@Controller('getCourse')
export class CourseGetterController {
  constructor(
    private readonly courseService: CourseService,
    private readonly unitService: UnitService,
    private readonly lessonService: LessonService,
    private readonly quizService: QuizService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<any> {
    try {
      // Fetch course by ID
      const course = await this.courseService.findById(id);
      if (!course) {
        return {
          success: false,
          message: 'Course not found',
          data: null,
        };
      }

      // Fetch units by course ID
      const units = await this.unitService.findByCourseId(id);
      
      // Fetch lessons and quizzes for each unit
      const unitsWithLessonsAndQuizzes = await Promise.all(units.map(async (unit) => {
        const lessons = await this.lessonService.findByUnitId(unit.unit_id);
        const quizzes = await this.quizService.findByUnitId(unit.unit_id);
        return {
          unit: unit,
          lessons: lessons,
          quizzes: quizzes,
        };
      }));

      // Return course with associated units, lessons, and quizzes
      return {
        success: true,
        message: 'Course found',
        data: {
          course: course,
          units: unitsWithLessonsAndQuizzes,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to find course',
        error: error.message,
      };
    }
  }
}
