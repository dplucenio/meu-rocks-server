import { Router } from 'express';
import { getRepository } from "typeorm";
import { startOfDay, parseISO } from 'date-fns'
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';;

let studentRouter = Router();

studentRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  let students = await userRepository.find({});
  return response.json(students);
});

studentRouter.post('/', async (request, response) => {
  const { username, email, password, name, nickname, birthday } = request.body;
  const userRepository = getRepository(User);
  const user = await new CreateUserService(userRepository).execute({
    username, email, password, name, nickname, birthday
  });
  response.json(user);
})

export default studentRouter;