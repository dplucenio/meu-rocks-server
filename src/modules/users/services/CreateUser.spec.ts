import AppError from '@shared/errors/AppError';
import { isEqual, parseISO } from 'date-fns';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUser from './CreateUser';
import { Role } from '../entities/User';

describe('CreateUser', () => {
  it('should be possible to create a new user', async () => {
    const userRepository = new FakeUserRepository();
    const user = await new CreateUser(userRepository).execute({
      name: 'Duque',
      nickname: 'Ducks',
      password: '123456',
      email: 'duque@mail.com',
      birthday: parseISO('1990-12-12'),
      role: Role.STUDENT,
    });
    expect(user.name).toEqual('Duque');
    const userFromEmail = await userRepository.findByEmail('duque@mail.com');
    expect(userFromEmail).toBe(user);
  });

  it('should be possible to create a user with a birthday as string', async () => {
    const userRepository = new FakeUserRepository();
    const dateString = '1990-12-12';
    {
      const duque = await new CreateUser(userRepository).execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO(dateString),
        role: Role.STUDENT,
      });
      expect(duque.name).toEqual('John Doe');
      expect(duque.email).toEqual('jdoe@mail.com');
      expect(duque.nickname).toEqual('Doe');
      expect(isEqual(duque.birthday, parseISO('1990-12-12'))).toBe(true);
    }
  });

  it('should use first name as nickname if null or empty nickname is provided', async () => {
    const userRepository = new FakeUserRepository();
    expect.assertions(2);
    let user = await new CreateUser(userRepository).execute({
      name: 'John Doe',
      password: '123456',
      email: 'jdoe@mail.com',
      birthday: parseISO('1990-12-12'),
      role: Role.STUDENT,
    });
    expect(user.nickname).toEqual('John');
    user = await new CreateUser(userRepository).execute({
      name: 'Paul McCartney',
      nickname: '',
      password: '123456',
      email: 'pmccartney@mail.com',
      birthday: parseISO('1990-12-12'),
      role: Role.STUDENT,
    });
    expect(user.nickname).toEqual('Paul');
  });

  it('should not be possible to create a user with null or empty name', async () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);

    let name: any;
    expect(
      createUserService.execute({
        name,
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
        role: Role.STUDENT,
      }),
    ).rejects.toThrowError(`User can't have null or empty name`);

    expect(
      createUserService.execute({
        name: '',
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
        role: Role.STUDENT,
      }),
    ).rejects.toThrowError(`User can't have null or empty name`);
  });

  it('should raise an error with birthday has an invalid Date', () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);
    expect.assertions(4);

    let birthday: any;
    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday,
        role: Role.STUDENT,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or invalid birthday`);
      });

    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO('john doe'),
        role: Role.STUDENT,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or invalid birthday`);
      });
  });

  it('should not be possible to create a user with null or empty password', async () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);
    expect.assertions(4);

    let password: any;
    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password,
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
        role: Role.STUDENT,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or empty password`);
      });

    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
        role: Role.STUDENT,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or empty password`);
      });
  });

  it('should not be possible to create a user with null or empty email', async () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);
    expect.assertions(4);

    let email: any;
    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123',
        email,
        birthday: parseISO('1990-12-12'),
        role: Role.STUDENT,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or empty email`);
      });

    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123',
        email: '',
        birthday: parseISO('1990-12-12'),
        role: Role.STUDENT,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or empty email`);
      });
  });

  it.only('should not be possible to create a user without a role or with a invalid one', async () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);
    expect.assertions(4);

    let role: any;
    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
        role,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or invalid role`);
      });

    role = 'ninja';
    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
        role,
      })
      .catch(error => {
        console.log(`here ${error.message}`);
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or invalid role`);
      });
  });

  it('should not be possible to create a user with already existing email', async () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);
    expect.assertions(2);

    await createUserService.execute({
      name: 'John Doe',
      nickname: 'Doe',
      password: '123',
      email: 'jdoe@mail.com',
      birthday: parseISO('1990-12-12'),
      role: Role.STUDENT,
    });

    createUserService
      .execute({
        name: 'Jean Doe',
        nickname: 'Doe',
        password: '123',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
        role: Role.STUDENT,
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`This e-mail is already used`);
      });
  });
});
