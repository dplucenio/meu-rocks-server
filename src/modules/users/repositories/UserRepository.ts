import { UserCreationDTO } from '@modules/users/dtos/UserDTO';
import User from '../entities/User';

interface UserRepository {
  create(data: UserCreationDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default UserRepository;
