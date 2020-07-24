import { parseISO } from 'date-fns';
import CreateStudentService from './CreateStudentService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('CreateUserService', () => {
  it('should be possible to create a new student', async () => {
    const userRepository = new FakeUserRepository();
    const studentRepository = new FakeStudentRepository();
    const createStudentService = new CreateStudentService(
      userRepository,
      studentRepository,
    );

    expect.assertions(3);
    const student = await createStudentService.execute({
      name: 'Duque',
      nickname: 'Ducks',
      password: '123456',
      email: 'duque@mail.com',
      birthday: parseISO('1990-12-12'),
      enrollment_number: 2,
    });

    expect(student.user.name).toEqual('Duque');
    expect(student.user.email).toEqual('duque@mail.com');
    expect(student.enrollment_number).toEqual(2);
  });
});
