import Student from '@modules/users/entities/Student';

type StudentCreationDTO = Omit<Student, 'id' | 'user_id'>;

interface StudentRepository {
  create(data: StudentCreationDTO): Promise<Student>;
}

export default StudentRepository;

export { StudentCreationDTO };
