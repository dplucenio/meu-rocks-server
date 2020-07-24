import Student from '@modules/users/entities/Student';
import UserCreationDTO from './UserDTO';

type CreateStudentServiceDTO = Omit<UserCreationDTO, 'role'> &
  Omit<Student, 'id' | 'user' | 'user_id'>;

export default CreateStudentServiceDTO;
