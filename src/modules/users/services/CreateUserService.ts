import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import UserCreationDTO from '../dtos/UserDTO';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';

class CreateUserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(request: UserCreationDTO): Promise<User> {
    await this.validateUserCreation(request);
    const { email, password, name, birthday, role } = request;
    let { nickname } = request;

    const defaultNickname = name.split(' ')[0];
    nickname = !nickname || nickname === '' ? defaultNickname : nickname;
    const hashedPassword = await hash(password, 8);

    const user = await this.repository.create({
      email,
      password: hashedPassword,
      name,
      nickname,
      birthday,
      role,
    });
    return user;
  }

  private async validateUserCreation(request: UserCreationDTO): Promise<void> {
    if (!request.name || request.name === '') {
      throw new AppError(`User can't have null or empty name`, 400);
    }
    if (!request.birthday || Number.isNaN(request.birthday.getTime())) {
      throw new AppError(`User can't have null or invalid birthday`, 400);
    }
    if (!request.password || request.password === '') {
      throw new AppError(`User can't have null or empty password`, 400);
    }
    if (!request.email || request.email === '') {
      throw new AppError(`User can't have null or empty email`, 400);
    }
    const existingEmailUser = await this.repository.findByEmail(request.email);
    if (existingEmailUser) {
      throw new AppError(`This e-mail is already used`, 400);
    }
  }
}

export default CreateUserService;
