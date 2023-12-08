/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MulterFile } from 'multer';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  findAll(): Promise<Promotion[]> {
    return this.promotionService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('video', { storage: diskStorage({
    destination: './uploads/promotion',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  })}))
  create(@UploadedFile() videoFile: MulterFile, @Body() promotion: Promotion): Promise<Promotion> {
    const newPromotion: Promotion = {
      id: undefined, 
      title: promotion.title,
      description: promotion.description,
      videoPath: `/uploads/promotion/${videoFile.filename}`, 
    };
    return this.promotionService.create(newPromotion);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.promotionService.delete(Number(id));
  }
}
