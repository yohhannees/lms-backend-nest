/* eslint-disable prettier/prettier */
import { Controller, Get, Post,  Delete, Param,   Body } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':quiz_id')
  async findById(@Param('quiz_id') quiz_id: number): Promise<Quiz> {
    return this.quizService.findById(quiz_id);
  }

  @Post(':unit_id')
  create(
    @Param('unit_id') unit_id: number,
    @Body() quiz: Quiz,
  ): Promise<Quiz> {
    const newQuiz: Quiz= {
        quiz_id: undefined,
        unit_id: unit_id,
        title: quiz.title,
        description:quiz.description,
        order: quiz.order,
        type: quiz.type,
        question: quiz.question,

    };
    return this.quizService.create(newQuiz);
  }

  @Delete(':quiz_id')
  async delete(@Param('quiz_id') quiz_id: string): Promise<void> {
    return this.quizService.delete(Number(quiz_id));
  }
}