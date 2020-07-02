import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthday: Date;
}

class CreateUser {
  // TODO: evaluate 'program to an interface' here
  private repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async execute({
    email,
    password,
    name,
    nickname,
    birthday
  }: Request): Promise<User> {
    const hashedPassword = await hash(password, 8);
    let user = this.repository.create(
      {email, password: hashedPassword, name, nickname, birthday});
    await this.repository.save(user);
    return user;
  }
}

export default CreateUser;