/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  lesson_id: number;

  @Column()
  unit_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  text: string;

  @Column()
  order: number;

  @Column()
  description: string;
}
