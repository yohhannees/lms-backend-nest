/* eslint-disable prettier/prettier */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './assessment.entity';


@Injectable()
export class AssessmentService {
  [x: string]: any;
  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
  ) {}

  async findAll(): Promise<Assessment[]> {
    return this.assessmentRepository.find();
  }


  async findById(assessment_id: number): Promise<Assessment> {
  return this.assessmentRepository.findOne({ where: { assessment_id } });
}

  async create(assessment: Assessment): Promise<Assessment> {
    return this.assessmentRepository.save(assessment);
  }


   async update(assessment_id: number, assessment: Assessment): Promise<Assessment> {
    await this.assessmentRepository.update(assessment_id, assessment);
    return this.assessmentRepository.findOne({ where: { assessment_id } });
  }

  async delete(assessment_id: number): Promise<void> {
    await this.assessmentRepository.delete(assessment_id);
  }
  
}
