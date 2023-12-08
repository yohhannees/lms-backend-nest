/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExpectationService } from './expectation.service';
import { Expectation } from './expectation.entity';

@Controller('expectations')
export class ExpectationController {
  constructor(private readonly expectationService: ExpectationService) {}

  @Get()
  async findAll(): Promise<Expectation[]> {
    return this.expectationService.findAll();
  }

  @Post()
  async create(@Body() expectation: Expectation): Promise<Expectation> {
    return this.expectationService.create(expectation);
  }
}
