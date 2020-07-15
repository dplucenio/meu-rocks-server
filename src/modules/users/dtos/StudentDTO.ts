import Student from '@modules/users/entities/Student';
import { UserCreationDTO } from './UserDTO';

type StudentCreationDTO = UserCreationDTO &
  Omit<Student, 'id' | 'user' | 'user_id'>;

export default StudentCreationDTO;
