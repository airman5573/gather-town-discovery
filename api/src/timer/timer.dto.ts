import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class StartTimerDto {
  @IsPositive({ each: true })
  @Type(() => Number)
  teams: number[];
}

export class StopTimerDto {
  @IsPositive()
  team: number;
}
