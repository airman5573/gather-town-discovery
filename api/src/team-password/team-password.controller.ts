import { Body, Controller, Get, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { OptionsService } from 'src/options/options.service';
import { UpdateTeamPasswordsDto } from './team-password.dto';
import { TeamPasswordEntity } from './team-password.entity';
import { TeamPasswordService } from './team-password.service';

@Controller('team-password')
export class TeamPasswordController {
  constructor(
    private teamPasswordService: TeamPasswordService,
    private optionsService: OptionsService,
  ) {}

  // update team passwords
  @Roles(ADMIN_ROLE)
  @Put()
  async updateTeamPasswords(
    @Body() updateTeamPasswordsDto: UpdateTeamPasswordsDto,
  ) {
    return this.teamPasswordService.update(updateTeamPasswordsDto);
  }

  @Roles(ADMIN_ROLE)
  @Get('all')
  async getAllTeamPasswords(): Promise<TeamPasswordEntity[]> {
    const teamPasswords = await this.teamPasswordService.getAll();
    const teamCount = (await this.optionsService.getTeamCount()).optionValue;
    return teamPasswords.slice(0, teamCount);
  }

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<TeamPasswordEntity[]> {
    return await this.teamPasswordService.reset();
  }
}
