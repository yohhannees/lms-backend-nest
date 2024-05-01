/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const quizzes = await this.quizService.findAll();
      return {
        success: true,
        message: 'Quizzes fetched successfully',
        data: quizzes,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch quizzes',
        error: error.message,
      };
    }
  }

  @Get(':quiz_id')
  async findById(@Param('quiz_id') quiz_id: number): Promise<any> {
    try {
      const quiz = await this.quizService.findById(quiz_id);
      if (quiz) {
        return {
          success: true,
          message: 'Quiz found',
          data: quiz,
        };
      } else {
        return {
          success: false,
          message: 'Quiz not found',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to find quiz',
        error: error.message,
      };
    }
  }

  @Post(':unit_id')
  async create(
    @Param('unit_id') unit_id: number,
    @Body() quiz: Quiz,
  ): Promise<any> {
    try {
      const newQuiz: Quiz = {
        quiz_id: undefined,
        unit_id: unit_id,
        title: quiz.title,
        description: quiz.description,
        order: quiz.order,
        type: quiz.type,
        question: quiz.question,
        course_id: quiz.course_id,
      };
      const createdQuiz = await this.quizService.create(newQuiz);
      return {
        success: true,
        message: 'Quiz created successfully',
        data: createdQuiz,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create quiz',
        error: error.message,
      };
    }
  }

  @Delete(':quiz_id')
  async delete(@Param('quiz_id') quiz_id: string): Promise<any> {
    try {
      await this.quizService.delete(Number(quiz_id));
      return {
        success: true,
        message: 'Quiz deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete quiz',
        error: error.message,
      };
    }
  }
}
