import Student from '@modules/users/entities/Student';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import ORMUser from './User';

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