import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsPositive, ValidateNested } from 'class-validator';
import { PointType } from 'src/types';

export class TeamPointDto {
  @Type(() => Number)
  @IsPositive()
  team: number;

  @Type(() => Number)
  @IsPositive()
  point: number;

  @IsEnum(PointType)
  pointType: PointType;
}

export class UpdateTeamPointsDto {
  @ValidateNested({ each: true })
  @Type(() => TeamPointDto)
  @IsArray()
  teamPoints: TeamPointDto[];
}
