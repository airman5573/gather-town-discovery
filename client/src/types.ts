import { LocalDateTime } from '@js-joda/core';

export enum YesOrNo {
  YES = 'yes',
  NO = 'no',
}

export enum PointTableKey {
  TimerPlus = 'timerPlus',
  TimerMinus = 'timerMinus',
  Upload = 'upload',
  OpenBoxCost = 'openBoxCost',
  OpenEmptyBox = 'openEmptyBox',
  OpenLetterBox = 'openLetterBox',
  Bingo = 'bingo',
  DescryptSentence = 'descryptSentence',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface AuthContextType {
  user?: User;
  login: (password: string) => Promise<void>;
}

export interface User {
  team?: number;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface TeamPassword {
  team: number;
  password: string;
}

export interface MenuItemProps {
  className: NavMenuItemEnum;
  label: string;
}

export enum NavMenuItemEnum {
  PointTable = 'point-table',
  PuzzleSetting = 'puzzle-setting',
  PuzzleStatus = 'puzzle-status',
  Reset = 'reset',
  Statistics = 'statistics',
  TeamPassword = 'team-password',
  TeamPoint = 'team-point',
  Timer = 'timer',
  Upload = 'upload',
  AdminPassword = 'admin-password',
}

export interface Timer {
  team: number;
  startTime: string;
  isRunning: YesOrNo;
}

export interface Option<ValueType> {
  optionKey: string;
  optionValue: ValueType;
}
