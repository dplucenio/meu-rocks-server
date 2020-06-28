import { Router } from 'express';
import { getRepository } from "typeorm";
import {startOfDay, parseISO} from 'date-fns'
import User from '../models/User';

let studentRouter = Router();

studentRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  let students = await userRepository.find({});
  return response.json(students);
});

studentRouter.post('/', async (request, response) => {
  const userRepository = getRepository(User);
  response.json('student create route');
})

export default studentRouter;