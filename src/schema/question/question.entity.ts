/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column()
  subject_id: number;

  @Column()
  question: string;

}
