import User from "@modules/users/entities/User";
import UserRepository from "@modules/users/repositories/UserRepository";
import { getRepository, Repository } from "typeorm";
import ORMUser from "../entities/User";


class ORMUserRepository implements UserRepository {
  private userRepository: Repository<ORMUser>;

  constructor() {
    this.userRepository = getRepository(ORMUser);
  }

  async create(userDTO: Omit<User, 'id'>): Promise<User> {
    const user: ORMUser = this.userRepository.create(userDTO);
    await this.userRepository.save(user)
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

}

export default ORMUserRepository;