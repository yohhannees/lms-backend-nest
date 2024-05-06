/* eslint-disable prettier/prettier */
// check.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CheckService } from './check.service';
import { Check } from './check.entity';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Get()
  findAll(): Promise<Check[]> {
    return this.checkService.findAll();
  }
  
  @Get(':type/:type_id/:user_id')
  async checkCompletion(@Param('type') type: string, @Param('type_id') type_id: number, @Param('user_id') user_id: number) {
    const check = await this.checkService.findByTypeAndUserId(type, type_id, user_id);
    if (check) {
      return { user_id: check.User_id, completed: true, type: check.type, type_id: check.type_id };
    } else {
      return { user_id, completed: false, type_id };
    }
  }
  
  @Get(':id')
  findById(@Param('id') id: number): Promise<Check> {
    return this.checkService.findById(id);
  }

  @Post()
  create(@Body() check: Check): Promise<Check> {
    return this.checkService.create(check);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() check: Check): Promise<Check> {
    return this.checkService.update(id, check);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.checkService.delete(id);
  }
}