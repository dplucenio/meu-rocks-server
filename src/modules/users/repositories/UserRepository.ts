import User from "../entities/User";

interface UserRepository {
  create(data: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default UserRepository;