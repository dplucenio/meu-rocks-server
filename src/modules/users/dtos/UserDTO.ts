import User, { Role } from '../entities/User';

interface UserCreationServiceDTO {
  email: string;
  password: string;
  name: string;
  nickname?: string;
  birthday: Date;
  role: Role;
}

type UserCreationDTO = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export { UserCreationServiceDTO, UserCreationDTO };
