export default interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthday: Date;
  created_at: Date;
  updated_at: Date;
}