import { Router } from 'express';
import { startOfDay, parseISO } from 'date-fns';
import Student from './models/Student';

let students: Student[] = [];
let studentRouter = Router();

studentRouter.get('/', (request, response) => {
  response.json({ msg: 'hello' });
});

studentRouter.post('/', (request, response) => {
  const { firstName, lastName, birthDay } = request.body;
  
  const student = new Student({
    firstName,
    lastName,
    birthDay: startOfDay(parseISO(birthDay))
  });
  
  students = [...students, student];
  response.json(students);
})

export default studentRouter;
