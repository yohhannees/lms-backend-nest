/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './schema/course/course.module';
import { ThumbnailModule } from './schema/course/thumbnail/thumbnail.module';
import { LessonModule } from './schema/lesson/lesson.module';
import { UnitModule } from './schema/unit/unit.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  "type": "postgres",  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "etata30",
  "database": "work",
  "synchronize": true,
  "logging": true,
  "entities": [__dirname + '/**/*.entity.{ts,js}'],
    }),
  
  CourseModule,
  ThumbnailModule,
  LessonModule,
  UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
