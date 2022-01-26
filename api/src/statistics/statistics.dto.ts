import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class TeamStatisticsDto {
  @Type(() => Number)
  @IsPositive()
  team: number;

  @Type(() => Number)
  @IsPositive()
  usable: number;

  @Type(() => Number)
  @IsInt()
  timer: number;

  @Type(() => Number)
  @IsPositive()
  boxOpen: number;

  @Type(() => Number)
  @IsPositive()
  sentenceDecryption: number;

  @Type(() => Number)
  @IsPositive()
  bingo: number;

  @Type(() => Number)
  @IsPositive()
  openEmptyBoxCount: number;

  @Type(() => Number)
  @IsPositive()
  openLetterBoxCount: number;

  @Type(() => Number)
  @IsPositive()
  percentageOfBoxOpen: number;

  @Type(() => Number)
  @IsPositive()
  sumOfPoint: number;

  @Type(() => Number)
  @IsPositive()
  contributionRank: number;
}
