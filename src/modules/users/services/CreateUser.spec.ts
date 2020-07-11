import CreateUser from "./CreateUser";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import { parseISO, isEqual } from 'date-fns';
import AppError from "@shared/errors/AppError";
import { Any } from "typeorm";

describe('CreateUser', () => {
  it('should be possible to create a new user', async () => {
    const userRepository = new FakeUserRepository();
    let user = await new CreateUser(userRepository).execute({
      name: 'Duque',
      nickname: 'Ducks',
      password: '123456',
      email: 'duque@mail.com',
      birthday: parseISO('1990-12-12')
    });
    expect(user.name).toEqual('Duque');
  });

  it('should be possible to create a user with a birthday as string', async () => {
    const userRepository = new FakeUserRepository();
    let dateString = '1990-12-12';
    {
      let duque = await new CreateUser(userRepository).execute({
        name: 'John Doe',
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO(dateString)
      });
      expect(duque.name).toEqual('John Doe');
      expect(duque.email).toEqual('jdoe@mail.com');
      expect(duque.nickname).toEqual('Doe');
      expect(isEqual(duque.birthday, parseISO('1990-12-12'))).toBe(true);
    }
  });

  it('should use first name as nickname if no nickname is provided', async () => {
    const userRepository = new FakeUserRepository();
    let user = await new CreateUser(userRepository).execute({
      name: 'John Doe',
      password: '123456',
      email: 'jdoe@mail.com',
      birthday: parseISO('1990-12-12')
    });
    expect(user.nickname).toEqual('John');
  });

  it('should not be possible to create a user with null name', async () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);

    let name: any;
    expect(
      createUserService.execute({
        name,
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12')
      })).rejects.toThrowError(`User can't have null or empty name`);

    expect(
      createUserService.execute({
        name: '',
        nickname: 'Doe',
        password: '123456',
        email: 'jdoe@mail.com',
        birthday: parseISO('1990-12-12')
      })).rejects.toThrowError(`User can't have null or empty name`);
  });

  it('should raise an error with birthday has an invalid Date', () => {
    const userRepository = new FakeUserRepository();
    const createUserService = new CreateUser(userRepository);
    let birthday: any;
    expect(createUserService.execute({
      name: 'John Doe',
      nickname: 'Doe',
      password: '123456',
      email: 'jdoe@mail.com',
      birthday
    })).rejects.toThrowError(`User can't have null birthday`);

    expect(createUserService.execute({
      name: 'John Doe',
      nickname: 'Doe',
      password: '123456',
      email: 'jdoe@mail.com',
      birthday: parseISO('john doe')
    })).rejects.toThrowError(`User can't have null birthday`);
  })
});