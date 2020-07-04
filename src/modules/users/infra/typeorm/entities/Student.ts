import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import ORMUser from './User';
import User from '@modules/users/entities/User';
import Student from '@modules/users/entities/Student';

@Entity('students')
class ORMStudent implements Student{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  enrollment_number: number;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => ORMUser)
  @JoinColumn({ name: 'user_id' })
  user: ORMUser;
}

export default ORMStudent;