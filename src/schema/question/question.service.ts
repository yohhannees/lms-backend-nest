/* eslint-disable prettier/prettier */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';


@Injectable()
export class QuestionService {
  [x: string]: any;
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }


  async findById(question_id: number): Promise<Question> {
  return this.questionRepository.findOne({ where: { question_id} });
}

  async create(question: Question): Promise<Question> {
    return this.questionRepository.save(question);
  }


   async update(question_id: number, question: Question): Promise<Question> {
    await this.questionRepository.update(question_id, question);
    return this.questionRepository.findOne({ where: { question_id} });
  }

  async delete(question_id: number): Promise<void> {
    await this.questionRepository.delete(question_id);
  }
  
}
