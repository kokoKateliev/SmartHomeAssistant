import { User } from './IUser';

export interface Family {
  users: User[];
  _id: string;
  familyName: string;
}
