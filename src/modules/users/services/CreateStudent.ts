import CreateUser from './CreateUser';
import UserRepository from '../repositories/UserRepository';
import User from '@modules/users/entities/User';
import Student from '@modules/users/entities/Student'
import StudentRepository from '../repositories/StudentRepository';

type Request = Omit<User, 'id' | 'created_at' | 'updated_at'>
  & Omit<Student, 'id' | 'user' | 'user_id'>;

class CreateStudent {
  userRepository: UserRepository;
  studentRepository: StudentRepository;

  constructor(
    userRepository: UserRepository, studentRepository: StudentRepository) {
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
  }

  async execute(request: Request): Promise<Student> {
    const createUserService = new CreateUser(this.userRepository);
    const user = await createUserService.execute({
      name: request.name,
      nickname: request.nickname,
      email: request.email,
      password: request.password,
      birthday: request.birthday
    });
    const student = await this.studentRepository.create({
      user_id: user.id,
      enrollment_number: request.enrollment_number,
    })    
    return student;
  }
}

export default CreateStudent;