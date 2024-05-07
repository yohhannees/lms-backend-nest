/* eslint-disable prettier/prettier */
// paidCourse.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaidCourse {
  @PrimaryGeneratedColumn()
  PaidCourse_id: number;

  @Column()
  user_id: number;

  @Column()
  course_id: number;

  @Column()
  tx_ref: string;

  @Column()
  paid : boolean;

}
