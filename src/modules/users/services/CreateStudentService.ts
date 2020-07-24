import Student from '@modules/users/entities/Student';
import StudentRepository from '../repositories/StudentRepository';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from './CreateUserService';
import CreateStudentServiceDTO from '../dtos/StudentDTO';
import { Role } from '../entities/User';

class CreateStudentService {
  userRepository: UserRepository;

  studentRepository: StudentRepository;

  constructor(
    userRepository: UserRepository,
    studentRepository: StudentRepository,
  ) {
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
  }

  async execute(request: CreateStudentServiceDTO): Promise<Student> {
    const createUserService = new CreateUserService(this.userRepository);
    const user = await createUserService.execute({
      name: request.name,
      nickname: request.nickname,
      email: request.email,
      password: request.password,
      birthday: request.birthday,
      role: Role.STUDENT,
    });
    const student = await this.studentRepository.create({
      user,
      enrollment_number: request.enrollment_number,
    });
    return student;
  }
}

export default CreateStudentService;
