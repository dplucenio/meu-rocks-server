import User from '../entities/User';

interface UserCreationServiceDTO {
  email: string;
  password: string;
  name: string;
  nickname?: string;
  birthday: Date;
}

type UserCreationDTO = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export { UserCreationServiceDTO, UserCreationDTO };
