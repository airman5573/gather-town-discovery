import { Body, Controller, Get, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { UpdateTeamPasswordsDto } from './team-password.dto';
import { TeamPasswordEntity } from './team-password.entity';
import { TeamPasswordService } from './team-password.service';

@Controller('team-password')
export class TeamPasswordController {
  constructor(private teamPasswordService: TeamPasswordService) {}

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
    return await this.teamPasswordService.getAll();
  }

  @Roles(ADMIN_ROLE)
  @Get('reset')
  async reset(): Promise<TeamPasswordEntity[]> {
    return await this.teamPasswordService.reset();
  }
}
