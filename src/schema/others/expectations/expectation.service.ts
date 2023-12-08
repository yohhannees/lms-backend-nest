/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expectation } from './expectation.entity';

@Injectable()
export class ExpectationService {
  constructor(
    @InjectRepository(Expectation)
    private readonly expectationRepository: Repository<Expectation>,
  ) {}

  async findAll(): Promise<Expectation[]> {
    return this.expectationRepository.find();
  }

  async create(expectation: Expectation): Promise<Expectation> {
    return this.expectationRepository.save(expectation);
  }
}
