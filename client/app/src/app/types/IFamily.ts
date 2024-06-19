import { Room } from './IRoom';
import { User } from './IUser';

export interface Family {
  users: User[];
  family_id: string;
  familyName: string;
  rooms: Room[];
}
