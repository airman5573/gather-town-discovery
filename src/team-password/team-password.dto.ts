export interface TeamPasswordDto {
  team: number;
  password: string;
}

export class UpdateTeamPasswordsDto {
  teamPasswords: Array<TeamPasswordDto>;
}
