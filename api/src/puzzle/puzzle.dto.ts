import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class OpenPuzzleDto {
  @IsPositive()
  team: number;

  @IsNotEmpty()
  @IsString()
  boxKey: string;
}

export class OpenPuzzleResultDto {
  @IsBoolean()
  isLetterBox: boolean;

  @IsNumber()
  bingoCount: number;
}

export class DescryptSentenceDto {
  @IsPositive()
  team: number;
  @MinLength(1, {
    message: '문장길이가 너무 짧습니다',
  })
  sentence: string;
}
