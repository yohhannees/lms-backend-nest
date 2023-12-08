/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { Banner } from './banner.entity';
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Post()
  create(@Body() banner: Banner): Promise<Banner> {
    return this.bannerService.create(banner);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.bannerService.delete(Number(id));
  }
}
