import User from "./User";

export default interface IStudent {
  id: string;
  enrollment_number: number;
  user_id: string;
  user: User;
}