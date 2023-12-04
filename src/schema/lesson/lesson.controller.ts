/* eslint-disable prettier/prettier */
import { Controller, Get, Post,  Delete, Param,  UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import {  FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async findAll(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  @Get(':lesson_id')
  async findById(@Param('lesson_id') lesson_id: number): Promise<Lesson> {
    return this.lessonService.findById(lesson_id);
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
  create(
    @UploadedFile() videoFile: MulterFile,
    @Param('unit_id') unit_id: number,
    @Body() lesson: Lesson,
  ): Promise<Lesson> {
    const newLesson: Lesson = {
      lesson_id: undefined,
      video: `/uploads/course/lesson/${videoFile.filename}`,
      unit_id: unit_id, 
      title: lesson.title,
     order: lesson.order,
     description: lesson.description,

    };
    return this.lessonService.create(newLesson);
  }

  @Delete(':lesson_id')
  async delete(@Param('lesson_id') lesson_id: string): Promise<void> {
    return this.lessonService.delete(Number(lesson_id));
  }
}