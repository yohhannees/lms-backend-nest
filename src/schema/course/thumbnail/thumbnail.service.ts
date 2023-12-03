/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thumbnail } from './thumbnail.entity';

@Injectable()
export class ThumbnailService {
  constructor(
    @InjectRepository(Thumbnail)
    private readonly thumbnailRepository: Repository<Thumbnail>,
  ) {}

  async findAll(): Promise<Thumbnail[]> {
    return this.thumbnailRepository.find();
  }

  async findById(thumbnail_id: number): Promise<Thumbnail> {
    return this.thumbnailRepository.findOne({ where: { thumbnail_id } });
  }

  async create(thumbnail: Thumbnail): Promise<Thumbnail> {
    return this.thumbnailRepository.save(thumbnail);
  }

  async update(thumbnail_id: number, thumbnail: Thumbnail): Promise<Thumbnail> {
    await this.thumbnailRepository.update(thumbnail_id, thumbnail);
    return this.thumbnailRepository.findOne({ where: { thumbnail_id } });
  }

  async delete(thumbnail_id: number): Promise<void> {
    await this.thumbnailRepository.delete(thumbnail_id);
  }
}