/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Get(':photo_id')
  async findById(@Param('photo_id') photo_id: number): Promise<Photo> {
    return this.photoService.findById(photo_id);
  }

  @Post(':lesson_id')
  @UseInterceptors(FileInterceptor('photo', { 
    storage: diskStorage({
      destination: './uploads/course/photo',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
      },
    }),
  }))
  async create(
    @UploadedFile() photoFile: MulterFile,
    @Param('lesson_id') lessonId: number,
  ): Promise<Photo> {
    const newPhoto: Photo = {
      photo_id: undefined,
      lesson_id: lessonId,
      photo: `/uploads/course/photo/${photoFile.filename}`,
    };
    return this.photoService.create(newPhoto);
  }

  @Delete(':photo_id')
  async delete(@Param('photo_id') photo_id: string): Promise<void> {
    await this.photoService.delete(Number(photo_id));
  }
}
