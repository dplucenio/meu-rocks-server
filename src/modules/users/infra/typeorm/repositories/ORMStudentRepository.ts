import Student from '@modules/users/entities/Student';
import StudentRepository, {
  StudentCreationDTO,
} from '@modules/users/repositories/StudentRepository';
import { getRepository, Repository } from 'typeorm';
import ORMStudent from '../entities/Student';

class ORMStudentRepository implements StudentRepository {
  private studentRepository: Repository<ORMStudent>;

  constructor() {
    this.studentRepository = getRepository(ORMStudent);
  }

  async create({
    enrollment_number,
    user,
  }: StudentCreationDTO): Promise<Student> {
    const student = this.studentRepository.create({
      enrollment_number,
      user,
    });
    await this.studentRepository.save(student);
    return student;
  }

  async findByEnrollmentNumber(
    enrollmentNumber: number,
  ): Promise<Student | undefined> {
    const student = await this.studentRepository.findOne({
      where: { enrollment_number: enrollmentNumber },
    });
    return student;
  }
}
export default ORMStudentRepository;
