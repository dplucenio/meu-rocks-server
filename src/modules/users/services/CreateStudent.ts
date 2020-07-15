import Student from '@modules/users/entities/Student';
import StudentRepository from '../repositories/StudentRepository';
import UserRepository from '../repositories/UserRepository';
import CreateUser from './CreateUser';
import StudentCreationDTO from '../dtos/StudentDTO';

class CreateStudent {
  userRepository: UserRepository;

  studentRepository: StudentRepository;

  constructor(
    userRepository: UserRepository,
    studentRepository: StudentRepository,
  ) {
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
  }

  async execute(request: StudentCreationDTO): Promise<Student> {
    const createUserService = new CreateUser(this.userRepository);
    const user = await createUserService.execute({
      name: request.name,
      nickname: request.nickname,
      email: request.email,
      password: request.password,
      birthday: request.birthday,
      role: request.role,
    });
    const student = await this.studentRepository.create({
      user_id: user.id,
      enrollment_number: request.enrollment_number,
    });
    return student;
  }
}

export default CreateStudent;
