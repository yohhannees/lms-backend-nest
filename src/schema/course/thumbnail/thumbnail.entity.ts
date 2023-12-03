/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Thumbnail {
    @PrimaryGeneratedColumn()
    thumbnail_id: number;

    @Column()
    course_id: number;

    @Column()
    photo: string;

}
