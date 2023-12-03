/* eslint-disable prettier/prettier */
import { Controller, Get, Post,  Delete, Param,  UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import {  FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';


@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  async findAll(): Promise<Unit[]> {
    return this.unitService.findAll();
  }

  @Get(':unit_id')
  async findById(@Param('unit_id') unit_id: number): Promise<Unit> {
    return this.unitService.findById(unit_id);
  }

  @Post(':course_id')
  @UseInterceptors(FileInterceptor('file', { 
    storage: diskStorage({
      destination: './uploads/course/unit_file',
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
    @Body() unit: Unit,
  ): Promise<Unit> {
    const newUnit: Unit = {
    
      course_id: course_id,
      unit_id: undefined,
      title: unit.title,
      file: `/uploads/course/lesson${File.filename}`,
      description:unit.description,

    };
    return this.unitService.create(newUnit);
  }

  @Delete(':unit_id')
  async delete(@Param('unit_id') unit_id: string): Promise<void> {
    return this.unitService.delete(Number(unit_id));
  }
}