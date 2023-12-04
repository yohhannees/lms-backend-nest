/* eslint-disable prettier/prettier */
import { Controller, Get, Post,  Delete, Param,  UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import {  FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { Assessment } from './assessment.entity';
import { AssessmentService } from './assessment.service';


@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get()
  async findAll(): Promise<Assessment[]> {
    return this.assessmentService.findAll();
  }

  @Get(':assessment_id')
  async findById(@Param('assessment_id') assessment_id: number): Promise<Assessment> {
    return this.assessmentService.findById(assessment_id);
  }

  @Post(':course_id')
  @UseInterceptors(FileInterceptor('file', { 
    storage: diskStorage({
      destination: './uploads/course/assessment',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
      },
    }),
  }))
  create(
    @UploadedFile() File: MulterFile,
    @Param('course_id') course_id: number,
    @Body() assessment: Assessment,
  ): Promise<Assessment> {
    const newAssessment: Assessment = {
      assessment_id: undefined,
      file: `/uploads/course/assessement/${File.filename}`,
      course_id: course_id,
      text:assessment.text,

    };
    return this.assessmentService.create(newAssessment);
  }

  @Delete(':assessment_id')
  async delete(@Param('assessment_id') assessment_id: string): Promise<void> {
    return this.assessmentService.delete(Number(assessment_id));
  }
}