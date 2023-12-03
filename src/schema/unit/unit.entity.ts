/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column,  } from 'typeorm';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  unit_id: number;

  @Column()
  course_id: number;


  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  file: string;
  

}
