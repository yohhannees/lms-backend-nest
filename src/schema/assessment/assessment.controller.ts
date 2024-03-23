/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { Assessment } from './assessment.entity';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get()
  async findAll(): Promise<{ success: boolean; message: string; data: Assessment[] }> {
    try {
      const assessments = await this.assessmentService.findAll();
      return { success: true, message: 'Assessments found.', data: assessments };
    } catch (error) {
      return { success: false, message: 'Failed to fetch assessments.', data: null };
    }
  }

  @Get(':assessment_id')
  async findById(@Param('assessment_id') assessment_id: number): Promise<{ success: boolean; message: string; data: Assessment }> {
    try {
      const assessment = await this.assessmentService.findById(assessment_id);
      if (assessment) {
        return { success: true, message: 'Assessment found.', data: assessment };
      } else {
        return { success: false, message: 'Assessment not found.', data: null };
      }
    } catch (error) {
      return { success: false, message: 'Failed to fetch assessment.', data: null };
    }
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
  async create(
    @UploadedFile() file: MulterFile,
    @Param('course_id') course_id: number,
    @Body() assessment: Assessment,
  ): Promise<{ success: boolean; message: string; data: Assessment }> {
    try {
      const newAssessment: Assessment = {
        assessment_id: undefined,
        file: `/uploads/course/assessment/${file.filename}`,
        course_id: course_id,
        text: assessment.text,
      };
      const createdAssessment = await this.assessmentService.create(newAssessment);
      return { success: true, message: 'Assessment created successfully.', data: createdAssessment };
    } catch (error) {
      return { success: false, message: 'Failed to create assessment.', data: null };
    }
  }

  @Delete(':assessment_id')
  async delete(@Param('assessment_id') assessment_id: string): Promise<{ success: boolean; message: string; data: null }> {
    try {
      await this.assessmentService.delete(Number(assessment_id));
      return { success: true, message: 'Assessment deleted successfully.', data: null };
    } catch (error) {
      return { success: false, message: 'Failed to delete assessment.', data: null };
    }
  }
}

