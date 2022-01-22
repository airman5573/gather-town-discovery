import { IsArray, IsEnum, IsPositive } from 'class-validator';
import { PointType } from 'src/types';

export class TeamPointDto {
  @IsPositive()
  team: number;

  @IsPositive()
  point: number;

  @IsEnum(PointType)
  pointType: PointType;
}

export class UpdateTeamPointsDto {
  @IsArray()
  teamPoints: TeamPointDto[];
}
