import { Repository, getRepository } from "typeorm";

import ORMUser from "../entities/User";
import User from "@modules/users/entities/User";

class ORMUserRepository {
  private userRepository: Repository<ORMUser>;

  constructor() {
    this.userRepository = getRepository(ORMUser);
  }

  async create(userDTO: Omit<User, 'id'>): Promise<User> {
    const user: ORMUser = this.userRepository.create(userDTO);
    await this.userRepository.save(user)
    return user;
  }
}

export default ORMUserRepository;