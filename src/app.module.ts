/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './schema/course/course.module';
import { ThumbnailModule } from './schema/course/thumbnail/thumbnail.module';
import { LessonModule } from './schema/lesson/lesson.module';
import { UnitModule } from './schema/unit/unit.module';
import { AssessmentModule } from './schema/assessment/assessment.module';
import { QuestionModule } from './schema/question/question.module';
import { QuizModule } from './schema/quiz/quiz.module';
import { SubjectModule } from './schema/subject/subject.module';
import { BannerModule } from './schema/others/banner/banner.module';
import { FaqModule } from './schema/others/faq/faq.module';
import { PromotionModule } from './schema/others/promotion/promotion.module';
import { ExpectationModule } from './schema/others/expectations/expectation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cnsbg30l6cac7385459g-a',
      port: 5432,
      username: 'yayaacademy_user',
      password: 'gSJgW3ZOZur8ezGZrXetF7OXzVGTYTsb',
      database: 'yayaacademy',
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'jossy',
      // password: 'yeyosfresh',
      // database: 'ya',
      // synchronize: true,
      // logging: true,
      // entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    CourseModule,
    ThumbnailModule,
    LessonModule,
    UnitModule,
    AssessmentModule,
    QuizModule,
    QuestionModule,
    SubjectModule,
    BannerModule,
    FaqModule,
    PromotionModule,
    ExpectationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
