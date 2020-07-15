import User from './User';

export default interface Student {
  id: string;
  enrollment_number: number;
  user_id: string;
  user: User;
}
