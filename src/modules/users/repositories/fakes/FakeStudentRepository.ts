import Student from '@modules/users/entities/Student';
import { uuid } from 'uuidv4';
import StudentRepository, { StudentCreationDTO } from '../StudentRepository';

class FakeStudentRepository implements StudentRepository {
  private students: Array<Student> = [];

  async create(data: StudentCreationDTO): Promise<Student> {
    const student: Student = {
      enrollment_number: data.enrollment_number,
      id: uuid(),
      user: data.user,
      user_id: data.user.id,
    };
    return student;
  }
}

export default FakeStudentRepository;
