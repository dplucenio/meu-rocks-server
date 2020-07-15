enum Role {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthday: Date;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

export default User;

export { Role };
