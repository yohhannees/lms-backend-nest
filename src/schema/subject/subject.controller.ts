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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const subjects = await this.subjectService.findAll();
      return {
        success: true,
        message: 'Subjects fetched successfully',
        data: subjects,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch subjects',
        error: error.message,
      };
    }
  }

  @Get(':subject_id')
  async findById(@Param('subject_id') subject_id: number): Promise<any> {
    try {
      const subject = await this.subjectService.findById(subject_id);
      if (subject) {
        return {
          success: true,
          message: 'Subject found',
          data: subject,
        };
      } else {
        return {
          success: false,
          message: 'Subject not found',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to find subject',
        error: error.message,
      };
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/subject/photo',
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
    @UploadedFile() photoFile: MulterFile,
    @Body() subject: Subject,
  ): Promise<any> {
    try {
      const newSubject: Subject = {
        subject_id: undefined,
        photo: `/uploads/subject/photo/${photoFile.filename}`,
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
      const createdSubject = await this.subjectService.create(newSubject);
      return {
        success: true,
        message: 'Subject created successfully',
        data: createdSubject,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create subject',
        error: error.message,
      };
    }
  }

  @Delete(':subject_id')
  async delete(@Param('subject_id') subject_id: string): Promise<any> {
    try {
      await this.subjectService.delete(Number(subject_id));
      return {
        success: true,
        message: 'Subject deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete subject',
        error: error.message,
      };
    }
  }
}
