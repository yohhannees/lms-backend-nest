/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './faq.entity';

@Injectable()
export class FaqService {
  [x: string]: any;
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async findAll(): Promise<Faq[]> {
    return this.faqRepository.find();
  }

  async create(faq: Faq): Promise<Faq> {
    return this.faqRepository.save(faq);
  }
    async delete(id: number): Promise<void> {
    await this.faqRepository.delete(id);
  }

}
