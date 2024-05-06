/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Check } from './check.entity';

@Injectable()
export class CheckService {
  constructor(
    @InjectRepository(Check)
    private readonly checkRepository: Repository<Check>,
  ) {}

  async findAll(): Promise<Check[]> {
    return this.checkRepository.find();
  }

  async findById(Check_id: number): Promise<Check> {
    return this.checkRepository.findOne({where: {Check_id}});
  }

  async create(check: Check): Promise<Check> {
    return this.checkRepository.save(check);
  }

  async update(Check_id: number, check: Check): Promise<Check> {
    await this.checkRepository.update(Check_id, check);
    return this.checkRepository.findOne({where: {Check_id}});
  }

  async delete(Check_id: number): Promise<void> {
    await this.checkRepository.delete(Check_id);
  }

  async findByTypeAndUserId(type: string, type_id: number, user_id: number): Promise<Check> {
    return this.checkRepository.findOne({ where: { type, type_id, User_id: user_id } });
  }
}