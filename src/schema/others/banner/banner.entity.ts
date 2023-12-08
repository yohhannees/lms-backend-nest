/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  textColor: string;

  @Column()
  bodyColor: string;

  @Column()
  text: string;
}
