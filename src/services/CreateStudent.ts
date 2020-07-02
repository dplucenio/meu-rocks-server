import { Repository } from 'typeorm';
import User from '../models/User';
import Student from '../models/Student';
import CreateUser from './CreateUser';

interface Request {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthday: Date;
  enrollment_number: number;
}

class CreateStudent {
  userRepository: Repository<User>;
  studentRepository: Repository<Student>;

  constructor(
    userRepository: Repository<User>, studentRepository: Repository<Student>) {
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
  }

  async execute(request: Request): Promise<Student> {
    const user = await new CreateUser(this.userRepository).execute({
      name: request.name,
      nickname: request.nickname,
      email: request.email,
      password: request.password,
      birthday: request.birthday
    });
    await this.userRepository.save(user);

    const student = this.studentRepository.create({
      user_id: user.id,
      enrollment_number: request.enrollment_number,
    })
    await this.studentRepository.save(student);
    return student;
  }
}

export default CreateStudent;