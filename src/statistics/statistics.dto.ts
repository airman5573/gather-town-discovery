import { IsInt, IsPositive } from 'class-validator';

export class TeamStatisticsDto {
  @IsPositive()
  team: number;

  @IsPositive()
  usable: number;

  @IsInt()
  timer: number;

  @IsPositive()
  boxOpen: number;

  @IsPositive()
  sentenceDecryption: number;

  @IsPositive()
  bingo: number;

  @IsPositive()
  openEmptyBoxCount: number;

  @IsPositive()
  openLetterBoxCount: number;

  @IsPositive()
  percentageOfBoxOpen: number;

  @IsPositive()
  sumOfPoint: number;

  @IsPositive()
  contributionRank: number;
}
