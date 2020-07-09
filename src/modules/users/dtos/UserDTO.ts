import User from "../entities/User";

type UserCreationDTO = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export {
  UserCreationDTO
}