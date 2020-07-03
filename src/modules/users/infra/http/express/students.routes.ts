import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Student from '@modules/users/infra/typeorm/entities/Student';
import CreateStudent from '@modules/users/services/CreateStudent';
import { startOfDay, parseISO } from 'date-fns';

let studentRouter = Router();


studentRouter.get('/', async (request, response) => {
  const studentRepository = getRepository(Student);
  // TODO: move this to a internal documentation
  // The following snippets produce the same output:

  // let students = await studentRepository
  //   .createQueryBuilder('students')
  //   .select(['users.id, name, nickname, email, birthday, enrollment_number'])
  //   .innerJoin('users', 'users', 'students.user_id = users.id')
  //   .getRawMany();


  // let students = await studentRepository.query(`
  //   SELECT users.id, name, nickname, email, birthday, enrollment_number FROM students
  //   JOIN users ON students.user_id = users.id;
  // `);

  let students = await studentRepository.find({ relations: ['user'] });
  const formattedStudents = students.map(student => ({
    id: student.user.id,
    name: student.user.name,
    nickname: student.user.nickname,
    email: student.user.email,
    birthday: student.user.birthday,
    enrollment_number: student.enrollment_number
  }));
  return response.json(formattedStudents);
});

studentRouter.post('/', async (request, response) => {
  const {
    email,
    password,
    name,
    nickname,
    birthday,
    enrollment_number
  } = request.body;

  const userRepository = getRepository(User);
  const studentRepository = getRepository(Student);
  const createStudentService = new CreateStudent(
    userRepository, studentRepository);

  const parsedBirthday: Date = startOfDay(parseISO(birthday));
  const student = await createStudentService.execute({
    email,
    password,
    name,
    nickname,
    birthday: parsedBirthday,
    enrollment_number
  });
  response.json(student);
})

export default studentRouter;