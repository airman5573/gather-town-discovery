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
  PuzzleMessage = 'puzzle_message',
  LastPuzzleVideoUrl = 'last_puzzle_video_url',
  CanOpenLastPuzzle = 'can_open_last_puzzle',
  IsRunningTimer = ' is_running_timer',
}
