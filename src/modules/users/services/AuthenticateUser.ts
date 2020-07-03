import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import ORMUser from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUser {
  userRepository: Repository<ORMUser>;

  constructor(userRepository: Repository<ORMUser>) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
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