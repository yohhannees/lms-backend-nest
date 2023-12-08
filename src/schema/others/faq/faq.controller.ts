/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete,Param } from '@nestjs/common';
import { Faq } from './faq.entity';
import { FaqService } from './faq.service';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  findAll(): Promise<Faq[]> {
    return this.faqService.findAll();
  }

  @Post()
  create(@Body() faq: Faq): Promise<Faq> {
    return this.faqService.create(faq);
  }
   @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.faqService.delete(Number(id));
  }
}
