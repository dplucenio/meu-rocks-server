import UserRepository from '@modules/users/repositories/UserRepository';
import User from '@modules/users/entities/User';
import { UserCreationDTO } from '@modules/users/dtos/UserDTO';
import { uuid } from 'uuidv4';

class FakeUserRepository implements UserRepository {
  private users: Array<User> = [];

  async create({
    email,
    password,
    name,
    nickname,
    birthday,
  }: UserCreationDTO): Promise<User> {
    const user = {
      id: uuid(),
      email,
      password,
      name,
      nickname,
      birthday,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users = [...this.users, user];
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}

export default FakeUserRepository;
