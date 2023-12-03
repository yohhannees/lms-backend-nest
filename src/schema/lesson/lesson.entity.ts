import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  lesson_id: number;

  @Column()
  unit_id: number;

  @Column()
  title: string;

  @Column()
  video: string;

  @Column()
  order: number;

  @Column()
  description: string;
}
