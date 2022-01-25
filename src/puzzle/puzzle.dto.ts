import { Type } from 'class-transformer';
import { IsPositive, Max, Min } from 'class-validator';
import { MAX_PUZZLE_COUNT } from 'src/constants';

export class OpenPuzzleDto {
  @Type(() => Number)
  @IsPositive()
  @Min(0)
  @Max(MAX_PUZZLE_COUNT)
  boxNum: number;
}
