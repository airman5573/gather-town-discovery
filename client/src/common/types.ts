export enum YesOrNo {
  YES = 'yes',
  NO = 'no',
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

export interface Timer {
  team: number;
  startTime: string;
  isRunning: YesOrNo;
}

export interface Option<ValueType> {
  optionKey: string;
  optionValue: ValueType;
}

export enum PointType {
  Usable = 'usable',
  Timer = 'timer',
  BoxOpen = 'boxOpen',
  SentenceDecryption = 'sentenceDecryption',
  Bingo = 'bingo',
}

export interface TeamPointEntity {
  team: number;
  usable: number;
  timer: number;
  boxOpen: number;
  sentenceDescription: number;
  bingo: number;
}

export interface TeamPoint {
  team: number;
  point: number;
  pointType: PointType;
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

export type PointTable = {
  [k in PointTableKey]?: number;
};

export type PointTableEntity = {
  id: number;
  key: PointTableKey;
  point: number;
};

export type TeamStatistics = {
  team: number;
  usable: number;
  timer: number;
  boxOpen: number;
  sentenceDecryption: number;
  bingo: number;
  openEmptyBoxCount: number;
  openLetterBoxCount: number;
  percentageOfBoxOpen: number;
  sumOfPoint: number;
  contributionRank: number;
};

export type MissionUploadFileType = {
  team: number;
  post: number;
  filename: string;
  isCheckedByAdmin: YesOrNo;
};

export type MissionUploadEntity = {
  team: number;
  post1: MissionUploadFileType[] | null;
  post2: MissionUploadFileType[] | null;
  post3: MissionUploadFileType[] | null;
  post4: MissionUploadFileType[] | null;
  post5: MissionUploadFileType[] | null;
  post6: MissionUploadFileType[] | null;
  post7: MissionUploadFileType[] | null;
  post8: MissionUploadFileType[] | null;
  post9: MissionUploadFileType[] | null;
  post10: MissionUploadFileType[] | null;
};

export type CheckDto = {
  team: number;
  post: number;
  point: number;
  filename: string;
};

export type PuzzleEntity = {
  team: number;
  openedBoxList: string[];
};

export type OpenPuzzleDto = {
  team: number;
  boxKey: string;
};

export type DescryptSentenceDto = {
  team: number;
  sentence: string;
};

export type PointChartBar = {
  team: string;
  point: number;
  color: string;
};

export type UploadConfig = {
  team: number;
  post: number;
  file: File;
  onUploadProgress: (progressEvent: any) => void;
  accessToken?: string;
};

export type LoginInfo = {
  team?: number;
  token?: string;
};
