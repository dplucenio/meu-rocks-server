import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import User, { Role } from '@modules/users/entities/User';

@Entity('users')
class ORMUser implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  nickname: string;

  @Column('timestamp with time zone')
  birthday: Date;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ORMUser;
export { User as IUser };
