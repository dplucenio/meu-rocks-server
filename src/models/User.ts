import { uuid } from 'uuidv4';

class User {
  id: string;
  firstName: string;
  lastName: string;
  birthDay: Date;

  constructor({firstName, lastName, birthDay}: Omit<User, 'id'>) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
  }
}

export default User;