import { Router } from 'express';
import { getRepository } from 'typeorm';
import AuthenticateUser from '@modules/users/services/AuthenticateUser';
import ORMUser from '@modules/users/infra/typeorm/entities/User';
import ORMUserRepository from '../../typeorm/repositories/UserRepository';

let sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  let userRepository = new ORMUserRepository();
  const { email, password } = request.body;
  const authenticateService = new AuthenticateUser(userRepository);
  const msg = await authenticateService.execute({ email, password });
  response.json(msg);
})

export default sessionsRouter;