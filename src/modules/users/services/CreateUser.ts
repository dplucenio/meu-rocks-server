import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import User from '../entities/User';
// import ORMUser from '../infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthday: Date;
}

class CreateUser {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute({
    email,
    password,
    name,
    nickname,
    birthday
  }: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const hashedPassword = await hash(password, 8);
    let user = await this.repository.create(
      { email, password: hashedPassword, name, nickname, birthday });
    return user;
  }
}

export default CreateUser;