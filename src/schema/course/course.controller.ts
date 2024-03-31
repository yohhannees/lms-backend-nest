/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { ThumbnailService } from './thumbnail/thumbnail.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/auth/user.service';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly thumbnailService: ThumbnailService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const courses: Course[] = await this.courseService.findAll();
      const coursesWithThumbnail: any[] = await Promise.all(
        courses.map(async (course: Course) => {
          const thumbnail = await this.thumbnailService.findById(
            course.course_id,
          );
          return {
            ...course,
            thumbnail: thumbnail ? thumbnail.photo : null,
          };
        }),
      );
      return {
        success: true,
        message: 'Courses found successfully.',
        data: coursesWithThumbnail,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve courses.',
        data: null,
      };
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('trailer', {
      storage: diskStorage({
        destination: './uploads/course/trailer',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = path.extname(file.originalname);
          callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() videoFile: MulterFile,
    @Body() course: Course,
  ): Promise<any> {
    try {
      const newCourse: Course = {
        course_id: undefined,
        title: course.title,
        about: course.about,
        trailer: `/uploads/course/trailer/${videoFile.filename}`,
        requirement: course.requirement,
        level: course.level,
        language: course.language,
        duration: course.duration,
        no_lesson: course.no_lesson,
        no_quiz: course.no_quiz,
        category: course.category,
        price: course.price,
      };
      const createdCourse = await this.courseService.create(newCourse);
      return {
        success: true,
        message: 'Course created successfully.',
        data: createdCourse,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create course.',
        data: null,
      };
    }
  }

  @Delete(':course_id')
  async delete(@Param('course_id') course_id: string): Promise<any> {
    try {
      await this.courseService.delete(Number(course_id));
      return {
        success: true,
        message: 'Course deleted successfully.',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete course.',
        data: null,
      };
    }
  }

  @Get(':course_id')
  @UseGuards(AuthGuard('jwt'))
  async findById(
    @Req() req,
    @Param('course_id') courseId: number,
  ): Promise<any> {
    const userId = req.user.id;
    try {
      const hasAccess = await this.userService.hasCourseAccess(
        userId,
        courseId,
      );
      if (hasAccess) {
        const course = await this.courseService.findById(courseId);
        if (!course) {
          return {
            success: false,
            message: 'Course not found.',
            data: null,
          };
        }
        return {
          success: true,
          message: 'Course found successfully.',
          data: course,
        };
      } else {
        return {
          success: false,
          message: 'You do not have access to this course.',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve course.',
        data: null,
      };
    }
  }
}
