import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import User from './User';

@Entity('students')
class Student{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bigint')
  enrollment_number: number;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;
}

export default Student;