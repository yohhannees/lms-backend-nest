/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  quiz_id: number;

  @Column( )
  unit_id: number;

  @Column({ nullable: true })
  course_id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  description: string;
  @Column()
  order: number;

  @Column()
  question: string;

}
