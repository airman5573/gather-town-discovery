import { Type } from 'class-transformer';
import { IsDateString, IsPositive } from 'class-validator';

export class UpdateTimerDto {
  @IsDateString()
  startTime: string;
}

export class CreateTimerDto {
  @IsPositive({ each: true })
  @Type(() => Number)
  teams: number[];
}
