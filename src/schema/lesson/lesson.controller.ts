/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { PhotoService } from './photo/photo.service';

@Controller('lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly photoService: PhotoService, 
  ) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const courses: Lesson[] = await this.lessonService.findAll();
      const lessonWithThumbnail: any[] = await Promise.all(
        courses.map(async (lesson: Lesson) => {
          const photo = await this.photoService.findById(lesson.lesson_id); 
          return {
            ...lesson,
            photo: photo ? photo.photo : null,
          };
        }),
      );
      return {
        success: true,
        message: 'Lesson found successfully.',
        data: lessonWithThumbnail,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve Lesson.',
        data: null,
      };
    }
  }

  @Get(':lesson_id')
  async findById(@Param('lesson_id') lesson_id: number): Promise<any> {
    try {
      const lesson = await this.lessonService.findById(lesson_id);
      if (!lesson) {
        return {
          success: false,
          message: 'Lesson not found.',
          data: null,
        };
      }
      const photo = await this.photoService.findById(lesson.lesson_id); 
      const courseWithThumbnail = {
        ...lesson,
        photo: photo ? photo.photo : null, 
      };
      return {
        success: true,
        message: 'Lesson found successfully.',
        data: courseWithThumbnail,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve Lesson.',
        data: null,
      };
    }
  }

  @Post(':unit_id')
  @UseInterceptors(FileInterceptor('video', { 
    storage: diskStorage({
      destination: './uploads/course/lesson',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
      },
    }),
  }))
  async create(
    @UploadedFile() videoFile: MulterFile,
    @Param('unit_id') unit_id: number,
    @Body() lesson: Lesson,
  ): Promise<any> {
    try {
      if (!videoFile) {
        throw new BadRequestException('Video file is missing');
      }
      const newLesson: Lesson = {
        lesson_id: undefined,
        video: `/uploads/course/lesson/${videoFile.filename}`,
        unit_id: unit_id,
        title: lesson.title,
        order: lesson.order,
        description: lesson.description,
        type: lesson.type,
        text: lesson.text,
      };
      const createdLesson = await this.lessonService.create(newLesson);
      return {
        success: true,
        message: 'Lesson created successfully',
        data: createdLesson,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create lesson',
        error: error.message,
      };
    }
  }

  @Delete(':lesson_id')
  async delete(@Param('lesson_id') lesson_id: string): Promise<any> {
    try {
      await this.lessonService.delete(Number(lesson_id));
      return {
        success: true,
        message: 'Lesson deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete lesson',
        error: error.message,
      };
    }
  }
}
