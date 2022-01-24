export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  team?: number;
  password: string;
  role: UserRole;
}

export type AccessTokenPayload = User;

export interface LoginResponse {
  access_token: string;
}

export enum YesOrNo {
  YES = 'yes',
  NO = 'no',
}

export enum OptionKey {
  AdminPassword = 'admin_password',
  CanSubmitDescryptedSentence = 'can_submit_descrypted_sentence',
  PuzzleCount = 'puzzle_count',
  OriginalPuzzleMessage = 'original_puzzle_message',
  ShuffledPuzzleMessageWithPlaceHolder = 'shuffled_puzzle_message_with_placeholder',
  LastPuzzleVideoUrl = 'last_puzzle_video_url',
  CanOpenLastPuzzle = 'can_open_last_puzzle',
  IsRunningTimer = ' is_running_timer',
}

export enum PointType {
  Usable = 'usable',
  Timer = 'timer',
  BoxOpen = 'boxOpen',
  SentenceDecryption = 'sentenceDecryption',
}

// OpenBox를 제외한 나머지는 reward이다.
export enum PointTableKey {
  TimerPlus = 'timer_plus',
  TimerMinus = 'timer_minus',
  Upload = 'upload',
  OpenBoxCost = 'open_box_cost',
  OpenEmptyBox = 'open_empty_box',
  OpenLetterBox = 'open_letter_box',
  Bingo = 'bingo',
  DescryptSentence = 'descrypt_sentence',
}

export type PointTable = {
  [k in PointTableKey]?: number;
};
