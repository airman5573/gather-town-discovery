import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class TeamPasswordDto {
  @IsNumber()
  team: number;

  @IsString()
  password: string;
}

export class UpdateTeamPasswordsDto {
  @IsArray()
  @Type(() => TeamPasswordDto)
  teamPasswords: Array<TeamPasswordDto>;
}
