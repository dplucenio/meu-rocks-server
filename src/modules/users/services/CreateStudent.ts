import { Repository } from 'typeorm';
import ORMUser, { IUser } from '../infra/typeorm/entities/User';
import ORMStudent from '../infra/typeorm/entities/Student';
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
  userRepository: Repository<ORMUser>;
  studentRepository: Repository<ORMStudent>;

  constructor(
    userRepository: Repository<ORMUser>, studentRepository: Repository<ORMStudent>) {
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
  }

  async execute(request: Request): Promise<ORMStudent> {
    const user: IUser = await new CreateUser(this.userRepository).execute({
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