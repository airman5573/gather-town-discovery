import { UserRole } from 'src/types';

export class UserDto {
  team?: number;
  password: string;
  role: UserRole;
}
