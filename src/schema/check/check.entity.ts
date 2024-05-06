/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Check {
    @PrimaryGeneratedColumn()
    Check_id: number;
  
    @Column()
    User_id: number;
  
    @Column()
    type: string;
  
    @Column()
    type_id: number;
   
}

