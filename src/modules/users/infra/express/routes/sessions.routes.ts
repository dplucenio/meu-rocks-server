import AuthenticateUser from '@modules/users/services/AuthenticateUser';
import { Router } from 'express';
import ORMUserRepository from '../../typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const userRepository = new ORMUserRepository();
  const { email, password } = request.body;
  const authenticateService = new AuthenticateUser(userRepository);
  const msg = await authenticateService.execute({ email, password });
  response.json(msg);
});

export default sessionsRouter;
