/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './banner.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {}

  async findAll(): Promise<Banner[]> {
    return this.bannerRepository.find();
  }

  async create(banner: Banner): Promise<Banner> {
    return this.bannerRepository.save(banner);
  }

  async delete(id: number): Promise<void> {
    await this.bannerRepository.delete(id);
  }
}
