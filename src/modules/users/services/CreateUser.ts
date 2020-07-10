import { hash } from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import User from '../entities/User';
import { UserCreationServiceDTO } from '../dtos/UserDTO';
import AppError from '@shared/errors/AppError';

class CreateUser {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(request: UserCreationServiceDTO): Promise<User> {
    this.validateUserCreation(request);
    let { email, password, name, nickname, birthday } = request;

    const defaultNickname = name.split(' ')[0];
    nickname = nickname ? nickname : defaultNickname;
    const hashedPassword = await hash(password, 8);

    let user = await this.repository.create(
      { email, password: hashedPassword, name, nickname, birthday });
    return user;
  }

  private validateUserCreation(request: UserCreationServiceDTO): void {
    if (!request.name || request.name === '') {
      throw new AppError(`User can't have null or empty name`, 400);
    }

  }
}

export default CreateUser;