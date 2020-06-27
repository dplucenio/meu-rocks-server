import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

  @Column('date')
  birthday: Date;
}

export default User;