/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findById(+id);
  }

  @Post()
  async create(@Body() categoryData: Category): Promise<Category> {
    return await this.categoryService.create(categoryData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() categoryData: Category): Promise<Category> {
    return await this.categoryService.update(+id, categoryData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.delete(+id);
  }
}
