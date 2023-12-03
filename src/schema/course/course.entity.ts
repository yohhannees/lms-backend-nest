// Import necessary modules from TypeORM
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
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
  no_quiz: number;

  @Column()
  category: string;

  @Column()
  price: string;
}
