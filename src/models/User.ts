import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  nickname: string;

  @Column('date')
  birthday: Date;
}

export default User;