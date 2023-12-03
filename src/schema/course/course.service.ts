/* eslint-disable prettier/prettier */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  [x: string]: any;
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }


  async findById(course_id: number): Promise<Course> {
  return this.courseRepository.findOne({ where: { course_id } });
}

  async create(course: Course): Promise<Course> {
    return this.courseRepository.save(course);
  }


   async update(course_id: number, course: Course): Promise<Course> {
    await this.courseRepository.update(course_id, course);
    return this.courseRepository.findOne({ where: { course_id } });
  }

  async delete(course_id: number): Promise<void> {
    await this.courseRepository.delete(course_id);
  }
  
}
