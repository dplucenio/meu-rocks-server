import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { UserCreationServiceDTO } from '../dtos/UserDTO';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';

class CreateUser {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(request: UserCreationServiceDTO): Promise<User> {
    await this.validateUserCreation(request);
    let { email, password, name, nickname, birthday } = request;

    const defaultNickname = name.split(' ')[0];
    nickname = (!nickname || nickname === '') ? defaultNickname : nickname;
    const hashedPassword = await hash(password, 8);

    let user = await this.repository.create(
      { email, password: hashedPassword, name, nickname, birthday });
    return user;
  }

  private async validateUserCreation(request: UserCreationServiceDTO): Promise<void> {
    if (!request.name || request.name === '') {
      throw new AppError(`User can't have null or empty name`, 400);
    }
    if (!request.birthday || isNaN(request.birthday.getTime())) {
      throw new AppError(`User can't have null or invalid birthday`, 400);
    }
    if (!request.password || request.password === '') {
      throw new AppError(`User can't have null or empty password`, 400);
    }
    if (!request.email || request.email === '') {
      throw new AppError(`User can't have null or empty password`, 400);
    }
    let existingEmailUser = await this.repository.findByEmail(request.email);
    if (existingEmailUser) {
      throw new AppError(`This e-mail is already used`, 400);
    }
  }
}

export default CreateUser;