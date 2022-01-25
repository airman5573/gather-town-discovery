import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';
import { UpdateTeamPointsDto } from './team-point.dto';
import { TeamPointEntity } from './team-point.entity';
import { TeamPointService } from './team-point.service';

@Controller('team-point')
export class TeamPointController {
  constructor(private readonly teamPointService: TeamPointService) {}

  @Roles('user')
  @Get()
  async getPointByUser(@User('team') team: number): Promise<TeamPointEntity> {
    return await this.teamPointService.getPoint(team);
  }

  @Roles('admin')
  @Get(':team')
  async getPointByAdmin(@Param('team') team: number): Promise<TeamPointEntity> {
    return await this.teamPointService.getPoint(team);
  }

  @Roles('admin', 'user')
  @Get('all')
  async getAllTeamPoint(): Promise<TeamPointEntity[]> {
    return await this.teamPointService.getAllTeamPoints();
  }

  @Roles('admin')
  @Put()
  async updatePoints(
    @Body() { teamPoints }: UpdateTeamPointsDto,
  ): Promise<TeamPointEntity[]> {
    return await this.teamPointService.updatePoints(teamPoints);
  }

  @Roles('admin')
  @Put('reset')
  async reset(): Promise<TeamPointEntity[]> {
    return await this.teamPointService.reset();
  }
}
