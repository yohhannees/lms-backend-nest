/* eslint-disable prettier/prettier */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';


@Injectable()
export class QuizService {
  [x: string]: any;
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }


  async findById(quiz_id: number): Promise<Quiz> {
  return this.quizRepository.findOne({ where: { quiz_id } });
}

  async create(quiz: Quiz): Promise<Quiz> {
    return this.quizRepository.save(quiz);
  }


   async update(quiz_id: number, quiz: Quiz): Promise<Quiz> {
    await this.quizRepository.update(quiz_id, quiz);
    return this.quizRepository.findOne({ where: { quiz_id } });
  }

  async delete(quiz_id: number): Promise<void> {
    await this.quizRepository.delete(quiz_id);
  }
  
}
