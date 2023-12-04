import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  assessment_id: number;

  @Column()
  course_id: number;

  @Column()
  file: string;

  @Column()
  text: string;
}
