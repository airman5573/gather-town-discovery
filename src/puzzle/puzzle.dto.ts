import { IsPositive, Max, Min } from 'class-validator';
import { MAX_PUZZLE_COUNT, MAX_TEAM } from 'src/constants';

export class OpenPuzzleDto {
  @IsPositive()
  @Min(1)
  @Max(MAX_TEAM)
  team: number;

  @IsPositive()
  @Min(0)
  @Max(MAX_PUZZLE_COUNT)
  boxNum: number;
}
