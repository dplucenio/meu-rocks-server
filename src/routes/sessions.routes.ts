import { Router } from 'express';
import AuthenticateUser from '../services/AuthenticateUser';
import { getRepository } from 'typeorm';
import User from '../models/User';

let sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateService = new AuthenticateUser(getRepository(User));
  const msg = await authenticateService.execute({ email, password });
  response.json(msg);
})

export default sessionsRouter;