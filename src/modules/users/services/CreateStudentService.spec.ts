import { parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
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
      enrollment_number: 1,
    });

    expect(student.user.name).toEqual('Duque');
    expect(student.user.email).toEqual('duque@mail.com');
    expect(student.enrollment_number).toEqual(1);
  });

  it('should not be possible to create a student with same enrollment number', async () => {
    expect.assertions(2);
    const userRepository = new FakeUserRepository();
    const studentRepository = new FakeStudentRepository();
    const createStudentService = new CreateStudentService(
      userRepository,
      studentRepository,
    );

    const student1 = await createStudentService.execute({
      name: 'John Lennon',
      nickname: 'John',
      password: '123456',
      email: 'jl@mail.com',
      birthday: parseISO('1990-12-12'),
      enrollment_number: 1,
    });

    try {
      const student2 = await createStudentService.execute({
        name: 'Paul McCartney',
        nickname: 'Paul',
        password: '123456',
        email: 'pm@mail.com',
        birthday: parseISO('1990-12-12'),
        enrollment_number: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
    const user = await userRepository.findByEmail('pm@mail');
    expect(user).toBeUndefined();
  });
});
