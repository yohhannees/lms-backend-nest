/* eslint-disable prettier/prettier */
import { Controller, Get, Post,  Delete, Param,   Body } from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionService } from './question.service';


@Controller('quiz')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get(':question_id')
  async findById(@Param('question_id') question_id: number): Promise<Question> {
    return this.questionService.findById(question_id);
  }

  @Post(':subject_id')
  create(
    @Param('subject_id') subject_id: number,
    @Body() question: Question,
  ): Promise<Question> {
    const newQuestion: Question= {
        question_id: undefined,
        subject_id: subject_id,
        question: question.question,

    };
    return this.questionService.create(newQuestion);
  }

  @Delete(':question_id')
  async delete(@Param('question_id') question_id: string): Promise<void> {
    return this.questionService.delete(Number(question_id));
  }
}