import CreateUser from "./CreateUser";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import { parseISO, isEqual } from 'date-fns';

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

  it('should be possible to create a user with a date or string', async () => {
    const userRepository = new FakeUserRepository();
    let dateString = '1990-12-12';
    {
      let duque = await new CreateUser(userRepository).execute({
        name: 'Duque',
        nickname: 'Ducks',
        password: '123456',
        email: 'duque@mail.com',
        birthday: parseISO(dateString)
      });
      expect(duque.name).toEqual('Duque');
      expect(isEqual(duque.birthday, parseISO('1990-12-12'))).toBe(true);
    }
  })

  // test('if nickname is undefined, the first name should be used', () => true)

});