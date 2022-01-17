export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  team?: number;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  access_token: string;
}
