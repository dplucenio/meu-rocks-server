import User from '../models/User';

interface CreateUserDTO {
  firstName: string,
  lastName: string,
  birthDay: Date,
}

class UserRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  public index(): User[] {
    return this.users;
  }

  public create({firstName, lastName, birthDay}: CreateUserDTO): User {
    const user = new User({ firstName, lastName, birthDay });
    this.users = [...this.users, user];
    return user;
  }

}

export default UserRepository;