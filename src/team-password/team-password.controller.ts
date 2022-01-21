import { Body, Controller, Get, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateTeamPasswordsDto } from './team-password.dto';
import { TeamPasswordEntity } from './team-password.entity';
import { TeamPasswordService } from './team-password.service';

@Controller('team-password')
export class TeamPasswordController {
  constructor(private teamPasswordService: TeamPasswordService) {}

  // update team passwords
  @Roles('admin')
  @Put('/')
  async updateTeamPasswords(
    @Body() updateTeamPasswordsDto: UpdateTeamPasswordsDto,
  ) {
    return this.teamPasswordService.update(updateTeamPasswordsDto);
  }

  @Roles('admin')
  @Get('all')
  async getAllTeamPasswords(): Promise<TeamPasswordEntity[]> {
    return await this.teamPasswordService.getAll();
  }

  @Roles('admin')
  @Get('reset')
  async reset(): Promise<TeamPasswordEntity[]> {
    return await this.teamPasswordService.reset();
  }
}
