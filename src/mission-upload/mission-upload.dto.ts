import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class UploadMissionFileDto {
  @Type(() => Number)
  @IsPositive()
  team: number;
}
