import Student from '@modules/users/entities/Student';
import StudentRepository from '@modules/users/repositories/StudentRepository';
import { getRepository, Repository } from 'typeorm';
import ORMStudent from '../entities/Student';

type StudentCreationDTO = Omit<Student, 'id' | 'user'>;

class ORMStudentRepository implements StudentRepository {
  private studentRepository: Repository<ORMStudent>;

  constructor() {
    this.studentRepository = getRepository(ORMStudent);
  }

  async create({
    enrollment_number,
    user_id,
  }: StudentCreationDTO): Promise<Student> {
    const student = this.studentRepository.create({
      enrollment_number,
      user_id,
    });
    await this.studentRepository.save(student);
    return student;
  }
}
export default ORMStudentRepository;
