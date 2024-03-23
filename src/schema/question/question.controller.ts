/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const questions = await this.questionService.findAll();
      return {
        success: true,
        message: 'Questions fetched successfully',
        data: questions
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch questions',
        error: error.message
      };
    }
  }

  @Get(':question_id')
  async findById(@Param('question_id') question_id: number): Promise<any> {
    try {
      const question = await this.questionService.findById(question_id);
      if (question) {
        return {
          success: true,
          message: 'Question found',
          data: question
        };
      } else {
        return {
          success: false,
          message: 'Question not found',
          data: null
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to find question',
        error: error.message
      };
    }
  }

  @Post(':subject_id')
  async create(
    @Param('subject_id') subject_id: number,
    @Body() question: Question,
  ): Promise<any> {
    try {
      const newQuestion: Question = {
        question_id: undefined,
        subject_id: subject_id,
        question: question.question,
      };
      const createdQuestion = await this.questionService.create(newQuestion);
      return {
        success: true,
        message: 'Question created successfully',
        data: createdQuestion
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create question',
        error: error.message
      };
    }
  }

  @Delete(':question_id')
  async delete(@Param('question_id') question_id: string): Promise<any> {
    try {
      await this.questionService.delete(Number(question_id));
      return {
        success: true,
        message: 'Question deleted successfully',
        data: null
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete question',
        error: error.message
      };
    }
  }
}
