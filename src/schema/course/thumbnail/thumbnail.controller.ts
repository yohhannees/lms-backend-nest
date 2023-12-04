/* eslint-disable prettier/prettier */
import { Controller, Get, Post,  Delete, Param,  UseInterceptors, UploadedFile } from '@nestjs/common';
import {  FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { ThumbnailService } from './thumbnail.service';
import { Thumbnail } from './thumbnail.entity';

@Controller('thumbnail')
export class ThumbnailController {
  constructor(private readonly thumbnailService: ThumbnailService) {}

  @Get()
  async findAll(): Promise<Thumbnail[]> {
    return this.thumbnailService.findAll();
  }

  @Get(':thumbnail_id')
  async findById(@Param('thumbnail_id') thumbnail_id: number): Promise<Thumbnail> {
    return this.thumbnailService.findById(thumbnail_id);
  }

  @Post(':course_id')
  @UseInterceptors(FileInterceptor('photo', { 
    storage: diskStorage({
      destination: './uploads/course/thumbnail',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
      },
    }),
  }))
  create(
    @UploadedFile() videoFile: MulterFile,
    @Param('course_id') courseId: number,
  ): Promise<Thumbnail> {
    const newThumbnail: Thumbnail = {
      thumbnail_id: undefined,
      photo: `/uploads/course/thumbnail/${videoFile.filename}`,
      course_id: courseId, 
    };
    return this.thumbnailService.create(newThumbnail);
  }

  @Delete(':thumbnail_id')
  async delete(@Param('thumbnail_id') thumbnail_id: string): Promise<void> {
    return this.thumbnailService.delete(Number(thumbnail_id));
  }
}