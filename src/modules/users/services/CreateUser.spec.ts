import AppError from '@shared/errors/AppError';
import { isEqual, parseISO } from 'date-fns';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUser from './CreateUser';

describe('CreateUser', () => {
  it('should be possible to create a new user', async () => {
    const userRepository = new FakeUserRepository();
    const user = await new CreateUser(userRepository).execute({
      name: 'Duque',
      nickname: 'Ducks',
      password: '123456',
      email: 'duque@mail.com',
      birthday: parseISO('1990-12-12'),
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
    });
    expect(user.nickname).toEqual('John');
    user = await new CreateUser(userRepository).execute({
      name: 'Paul McCartney',
      nickname: '',
      password: '123456',
      email: 'pmccartney@mail.com',
      birthday: parseISO('1990-12-12'),
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
      }),
    ).rejects.toThrowError(`User can't have null or empty name`);

    expect(
      createUserService.execute({
        name: '',
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
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
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or empty password`);
      });

    createUserService
      .execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123',
        email: '',
        birthday: parseISO('1990-12-12'),
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`User can't have null or empty password`);
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
    });

    createUserService
      .execute({
        name: 'Jean Doe',
        nickname: 'Doe',
        password: '123',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12'),
      })
      .catch(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(`This e-mail is already used`);
      });
  });
});
