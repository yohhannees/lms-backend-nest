/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';



@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  async findById(unit_id: number): Promise<Unit> {
    return this.unitRepository.findOne({ where: { unit_id} });
  }

  async create(thumbnail: Unit): Promise<Unit> {
    return this.unitRepository.save(thumbnail);
  }

  async update(unit_id: number, unit: Unit): Promise<Unit> {
    await this.unitRepository.update(unit_id, unit);
    return this.unitRepository.findOne({ where: { unit_id} });
  }

  async delete(unit_id: number): Promise<void> {
    await this.unitRepository.delete(unit_id);
  }

  async findByCourseId(course_id: number): Promise<Unit[]> {
    return this.unitRepository.find({ where: { course_id } });
  }
}