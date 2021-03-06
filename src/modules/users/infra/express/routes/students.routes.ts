import ORMStudent from '@modules/users/infra/typeorm/entities/Student';
import ORMStudentRepository from '@modules/users/infra/typeorm/repositories/ORMStudentRepository';
import ORMUserRepository from '@modules/users/infra/typeorm/repositories/ORMUserRepository';
import CreateStudentService from '@modules/users/services/CreateStudentService';
import { parseISO, startOfDay } from 'date-fns';
import { Router } from 'express';
import { getRepository } from 'typeorm';

const studentRouter = Router();

studentRouter.get('/', async (request, response) => {
  const studentRepository = getRepository(ORMStudent);
  // TODO: move this to a internal documentation
  // The following snippets produce the same output:

  // let students = await studentRepository
  //   .createQueryBuilder('students')
  //   .select(['users.id, name, nickname, email, birthday, enrollment_number'])
  //   .innerJoin('users', 'users', 'students.user_id = users.id')
  //   .getRawMany();

  // const students = await studentRepository.query(`
  //   SELECT users.id, students.id as badabi, name, nickname, email, birthday, enrollment_number FROM students
  //   JOIN users ON students.user_id = users.id;
  // `);

  const students: Array<ORMStudent> = await studentRepository.find({
    relations: ['user'],
  });
  const formattedStudents = students.map(student => ({
    id: student.user.id,
    name: student.user.name,
    nickname: student.user.nickname,
    email: student.user.email,
    birthday: student.user.birthday,
    enrollment_number: student.enrollment_number,
    role: student.user.role,
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
    enrollment_number,
  } = request.body;

  const userRepository = new ORMUserRepository();
  const studentRepository = new ORMStudentRepository();
  const createStudentService = new CreateStudentService(
    userRepository,
    studentRepository,
  );

  const parsedBirthday: Date = startOfDay(parseISO(birthday));
  const student = await createStudentService.execute({
    email,
    password,
    name,
    nickname,
    birthday: parsedBirthday,
    enrollment_number,
  });
  response.json(student);
});

export default studentRouter;
