import { Router } from 'express';
import UserRepository from '../repositories/UserRepository';

let userRepository = new UserRepository();
let studentRouter = Router();

studentRouter.get('/', (request, response) => {
  response.json(userRepository.index());
});

studentRouter.post('/', (request, response) => {
  const { firstName, lastName, birthDay } = request.body;
  let user = userRepository.create({firstName, lastName, birthDay});
  response.json(user);
})

export default studentRouter;