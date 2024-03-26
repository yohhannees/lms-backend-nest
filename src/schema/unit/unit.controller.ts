/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('unit')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const units = await this.unitService.findAll();
      return {
        success: true,
        message: 'Units fetched successfully',
        data: units,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch units',
        error: error.message,
      };
    }
  }

  @Get(':unit_id')
  async findById(@Param('unit_id') unit_id: number): Promise<any> {
    try {
      const unit = await this.unitService.findById(unit_id);
      if (unit) {
        return {
          success: true,
          message: 'Unit found',
          data: unit,
        };
      } else {
        return {
          success: false,
          message: 'Unit not found',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to find unit',
        error: error.message,
      };
    }
  }

  @Post(':course_id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/course/unit_file',
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
    @UploadedFile() File: MulterFile,
    @Param('course_id') course_id: number,
    @Body() unit: Unit,
  ): Promise<any> {
    try {
      const newUnit: Unit = {
        course_id: course_id,
        unit_id: undefined,
        title: unit.title,
        file: `/uploads/course/unit_file/${File.filename}`,
        description: unit.description,
      };
      const createdUnit = await this.unitService.create(newUnit);
      return {
        success: true,
        message: 'Unit created successfully',
        data: createdUnit,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create unit',
        error: error.message,
      };
    }
  }

  @Delete(':unit_id')
  async delete(@Param('unit_id') unit_id: string): Promise<any> {
    try {
      await this.unitService.delete(Number(unit_id));
      return {
        success: true,
        message: 'Unit deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete unit',
        error: error.message,
      };
    }
  }
}
