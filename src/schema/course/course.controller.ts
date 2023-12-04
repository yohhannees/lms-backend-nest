/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param,  UseInterceptors, UploadedFile } from '@nestjs/common';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import {  FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':course_id')
  async findById(@Param('course_id') course_id: number): Promise<Course> {
    return this.courseService.findById(course_id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('trailer', { storage: diskStorage({
    destination: './uploads/course/trailer',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  })}))
  create(@UploadedFile() videoFile: MulterFile, @Body() course: Course): Promise<Course> {
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
      category:course.category,
      price:course.price
      
    };
    return this.courseService.create(newCourse);
  }

  @Delete(':course_id')
  async delete(@Param('course_id') course_id: string): Promise<void> {
    return this.courseService.delete(Number(course_id));
  }
}
