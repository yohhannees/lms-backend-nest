import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  assessment_id: number;

  @Column()
  course_id: string;

  @Column()
  file: string;

  @Column()
  text: string;
}
