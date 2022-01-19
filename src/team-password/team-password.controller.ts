import { Body, Controller, Get, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateTeamPasswordsDto } from './team-password.dto';
import { TeamPassword } from './team-password.entity';
import { TeamPasswordService } from './team-password.service';

@Controller('team-passwords')
export class TeamPasswordController {
  constructor(private teamPasswordService: TeamPasswordService) {}

  // get team passwords

  // update team passwords
  @Roles('admin')
  @Put('update')
  async updateTeamPasswords(
    @Body() updateTeamPasswordsDto: UpdateTeamPasswordsDto,
  ) {
    this.teamPasswordService.update(updateTeamPasswordsDto);
  }

  @Roles('admin')
  @Get('all')
  async getAllTeamPasswords(): Promise<TeamPassword[]> {
    return await this.teamPasswordService.getAll();
  }
}
