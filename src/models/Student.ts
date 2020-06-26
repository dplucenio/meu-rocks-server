import { uuid } from 'uuidv4';

class Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDay: Date;

  constructor({firstName, lastName, birthDay}: Omit<Student, 'id'>) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
  }
}

export default Student;