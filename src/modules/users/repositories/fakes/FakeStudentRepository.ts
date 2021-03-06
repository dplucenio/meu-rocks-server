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
    this.students = [...this.students, student];
    return student;
  }

  async findByEnrollmentNumber(
    enrollmentNumber: number,
  ): Promise<Student | undefined> {
    return this.students.find(student => {
      return student.enrollment_number === enrollmentNumber;
    });
  }
}

export default FakeStudentRepository;
