/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';


@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findById(lesson_id: number): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { lesson_id } });
  }

  async create(thumbnail: Lesson): Promise<Lesson> {
    return this.lessonRepository.save(thumbnail);
  }

  async update(lesson_id: number, lesson: Lesson): Promise<Lesson> {
    await this.lessonRepository.update(lesson_id, lesson);
    return this.lessonRepository.findOne({ where: { lesson_id } });
  }

  async delete(lesson_id: number): Promise<void> {
    await this.lessonRepository.delete(lesson_id);
  }
}