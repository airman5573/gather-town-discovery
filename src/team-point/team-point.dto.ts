import { IsEnum, IsPositive } from 'class-validator';
import { PointType } from 'src/types';

export class UpdatePointDto {
  @IsPositive()
  team: number;

  @IsPositive()
  point: number;

  @IsEnum(PointType)
  pointType: PointType;
}
