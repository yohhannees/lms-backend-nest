/* eslint-disable prettier/prettier */
// Import necessary modules from TypeORM
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subject_id: number;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column({nullable : true})
  trailer: string;

  @Column()
  requirement: string;

  @Column()
  level: string;

  @Column()
  language: string;

  @Column()
  duration: string;

  @Column()
  no_lesson: number;

  @Column()
  No_quiz: number;

  @Column()
  category: number;

  @Column()
  price: string;
}
