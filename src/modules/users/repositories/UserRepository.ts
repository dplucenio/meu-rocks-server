import User from "../entities/User";
import {UserCreationDTO} from '@modules/users/dtos/UserDTO';

interface UserRepository {
  create(data: UserCreationDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default UserRepository;