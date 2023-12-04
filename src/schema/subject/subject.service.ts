/* eslint-disable prettier/prettier */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';


@Injectable()
export class SubjectService {
  [x: string]: any;
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }


  async findById(subject_id: number): Promise<Subject> {
  return this.subjectRepository.findOne({ where: { subject_id } });
}

  async create(subject: Subject): Promise<Subject> {
    return this.subjectRepository.save(subject);
  }


   async update(subject_id: number, subject: Subject): Promise<Subject> {
    await this.subjectRepository.update(subject_id, subject);
    return this.subjectRepository.findOne({ where: { subject_id } });
  }

  async delete(subject_id: number): Promise<void> {
    await this.subjectRepository.delete(subject_id);
  }
  
}
