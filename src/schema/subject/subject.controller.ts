/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param,  UseInterceptors, UploadedFile } from '@nestjs/common';

import {  FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':subject_id')
  async findById(@Param('subject_id') subject_id: number): Promise<Subject> {
    return this.subjectService.findById(subject_id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('photo', { storage: diskStorage({
    destination: './uploads/subject/photo',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  })}))
  create(@UploadedFile() videoFile: MulterFile, @Body() subject: Subject): Promise<Subject> {
    const newSubject: Subject = {
     
   
      subject_id: undefined,
      photo: `/uploads/subject/photo/${videoFile.filename}`,
      title: subject.title,
      about: subject.about,
      requirement: subject.requirement,
      level: subject.level,
      language: subject.language,
      duration: subject.duration,
      year: subject.year,
      type: subject.type,
      price: subject.price,

    
    };
    return this.subjectService.create(newSubject);
  }

  @Delete(':subject_id')
  async delete(@Param('subject_id') subject_id: string): Promise<void> {
    return this.subjectService.delete(Number(subject_id));
  }
}
