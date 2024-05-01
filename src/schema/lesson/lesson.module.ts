/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PhotoModule } from './photo/photo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonController } from './lesson.controller';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { Photo } from './photo/photo.entity';
import { PhotoController } from './photo/photo.controller';
import { PhotoService } from './photo/photo.service';



@Module({
  imports: [TypeOrmModule.forFeature([Lesson,Photo]),  PhotoModule,],

  controllers: [LessonController,PhotoController],
  providers: [LessonService,PhotoService],
})
export class LessonModule{}
