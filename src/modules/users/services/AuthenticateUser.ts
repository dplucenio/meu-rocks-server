import UserRepository from '@modules/users/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUser {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination');
    }
    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new AppError('Incorrect email/password combination');
    }

    const token = sign(
      { id: user.id, nickname: user.nickname },
      process.env.TOKEN_SECRET as string, {
      subject: user.id,
      expiresIn: '1d',
    });
    return {
      token
    }
  }
}

export default AuthenticateUser;