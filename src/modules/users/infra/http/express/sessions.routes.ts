import { Router } from 'express';
import { getRepository } from 'typeorm';
import AuthenticateUser from '@modules/users/services/AuthenticateUser';
import User from '@modules/users/infra/typeorm/entities/User';

let sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateService = new AuthenticateUser(getRepository(User));
  const msg = await authenticateService.execute({ email, password });
  response.json(msg);
})

export default sessionsRouter;