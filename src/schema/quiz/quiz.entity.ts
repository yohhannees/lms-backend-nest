/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  quiz_id: number;

  @Column()
  title: string;

  @Column()
   type: string;

  @Column()
  question: string;

  @Column()
  answer: string;

}
