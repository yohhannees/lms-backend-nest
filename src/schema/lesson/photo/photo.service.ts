/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  async findById(photo_id: number): Promise<Photo> {
    return this.photoRepository.findOne({where:{photo_id}});
  }

  async create(photo: Photo): Promise<Photo> {
    return this.photoRepository.save(photo);
  }

  async delete(photo_id: number): Promise<void> {
    await this.photoRepository.delete(photo_id);
  }
}
