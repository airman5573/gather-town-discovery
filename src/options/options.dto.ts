import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { YesOrNo } from 'src/types';

export class PuzzleMessageDto {
  shuffledPuzzleMessageWithPlaceHolder: Array<string>;
  originalPuzzleMessage: string;
}

// Admin Password
export class UpdateAdminPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}

// Puzzle

export class UpdateLastPuzzleVideoUrlDto {
  @IsString()
  videoUrl: string;
}

export class UpdatePuzzleMessageDto {
  @IsString()
  message: string;
}

export class UpdatePuzzleCountDto {
  @IsNumber()
  @Min(0)
  @Max(66)
  puzzleCount: number;
}

export class UpdateCanSubmitDescryptedSentenceDto {
  @IsEnum(YesOrNo)
  status: YesOrNo;
}

export class UpdateCanOpenLastPuzzleDto {
  @IsEnum(YesOrNo)
  status: YesOrNo;
}

// Timer

export class UpdateIsRunningTimerDto {
  @IsEnum(YesOrNo)
  status: YesOrNo;
}
