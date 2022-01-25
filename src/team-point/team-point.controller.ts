import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';
import { ADMIN_ROLE, USER_ROLE } from 'src/constants';
import { UpdateTeamPointsDto } from './team-point.dto';
import { TeamPointEntity } from './team-point.entity';
import { TeamPointService } from './team-point.service';

@Controller('team-point')
export class TeamPointController {
  constructor(private readonly teamPointService: TeamPointService) {}

  @Roles(USER_ROLE)
  @Get()
  async getPointByUser(@User('team') team: number): Promise<TeamPointEntity> {
    return await this.teamPointService.getPoint(team);
  }

  @Roles(ADMIN_ROLE)
  @Get(':team')
  async getPointByAdmin(@Param('team') team: number): Promise<TeamPointEntity> {
    return await this.teamPointService.getPoint(team);
  }

  @Roles(ADMIN_ROLE, USER_ROLE)
  @Get('all')
  async getAllTeamPoint(): Promise<TeamPointEntity[]> {
    return await this.teamPointService.getAllTeamPoints();
  }

  @Roles(ADMIN_ROLE)
  @Put()
  async updatePoints(
    @Body() { teamPoints }: UpdateTeamPointsDto,
  ): Promise<TeamPointEntity[]> {
    return await this.teamPointService.updatePoints(teamPoints);
  }

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<TeamPointEntity[]> {
    return await this.teamPointService.reset();
  }
}
