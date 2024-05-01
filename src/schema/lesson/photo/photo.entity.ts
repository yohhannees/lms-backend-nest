/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    photo_id: number;

    @Column()
    lesson_id: number;

    @Column()
    photo: string;

}
