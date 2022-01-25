import { IsPositive, Max, Min } from 'class-validator';
import { MAX_PUZZLE_COUNT } from 'src/constants';

export class OpenPuzzleDto {
  @IsPositive()
  @Min(0)
  @Max(MAX_PUZZLE_COUNT)
  boxNum: number;
}
