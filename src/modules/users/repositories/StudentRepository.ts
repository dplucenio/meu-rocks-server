import Student from '@modules/users/entities/Student';

interface StudentRepository {
  create(data: Omit<Student, 'id' | 'user'>): Promise<Student>;
}

export default StudentRepository;
