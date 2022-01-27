import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { OptionKey, YesOrNo } from 'src/types';

export class OptionDto {
  optionKey: OptionKey;
  optionValue: any;

  static create(key: OptionKey, value: any): OptionDto {
    const dto = new OptionDto();
    dto.optionKey = key;
    dto.optionValue = value;
    return dto;
  }
}

export class AllOptionsDto {
  adminPassword: string;
  canSubmitDescryptedSentence: YesOrNo;
  puzzleCount: number;
  originalPuzzleMessage: string;
  shuffledPuzzleMessageWithPlaceholder: string[];
  lastPuzzleVideoUrl: string;
  canOpenLastPuzzle: YesOrNo;
  isRunningTimer: YesOrNo;
  companyImage: string;
  mapImage: string;
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
