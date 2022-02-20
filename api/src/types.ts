import { UserDto } from './auth/dtos/user.dto';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export type AccessTokenPayload = UserDto;

export interface LoginResponse {
  access_token: string;
}

export enum YesOrNo {
  YES = 'yes',
  NO = 'no',
}

export enum OptionKey {
  TeamCount = 'teamCount',
  AdminPassword = 'adminPassword',
  CanSubmitDescryptedSentence = 'canSubmitDescryptedSentence',
  PuzzleCount = 'puzzleCount',
  OriginalPuzzleMessage = 'originalPuzzleMessage',
  ShuffledPuzzleMessageWithPlaceHolder = 'shuffledPuzzleMessageWithPlaceholder',
  LastPuzzleVideoUrl = 'lastPuzzleVideoUrl',
  CanOpenLastPuzzle = 'canOpenLastPuzzle',
  IsRunningTimer = 'isRunningTimer',
  LapTime = 'lapTime',
  CompanyImage = 'companyImage',
  MapImage = 'mapImage',
}

export enum PointType {
  Usable = 'usable',
  Timer = 'timer',
  BoxOpen = 'boxOpen',
  SentenceDecryption = 'sentenceDecryption',
  Bingo = 'bingo',
}

// OpenBox를 제외한 나머지는 reward이다.
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

export type MissionUploadFileType = {
  team: number;
  post: number;
  filename: string;
  isCheckedByAdmin: YesOrNo;
};

export type Grid = Array<Array<number>>;

export type Position = Array<number>;
