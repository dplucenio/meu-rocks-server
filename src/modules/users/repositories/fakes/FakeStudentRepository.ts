import Student from '@modules/users/entities/Student';
import { uuid } from 'uuidv4';
import StudentRepository from '../StudentRepository';

class FakeStudentRepository implements StudentRepository {
  private students: Array<Student> = [];

  async create(data: Omit<Student, 'id'>): Promise<Student> {
    const student: Student = {
      enrollment_number: data.enrollment_number,
      id: uuid(),
      user: data.user,
      user_id: data.user_id,
    };
    return student;
  }
}

export default FakeStudentRepository;
