import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { ADMIN_ROLE, USER_ROLE } from 'src/constants';
import { OptionsService } from 'src/options/options.service';
import { UpdateTeamPointDto, UpdateTeamPointsDto } from './team-point.dto';
import { TeamPointEntity } from './team-point.entity';
import { TeamPointService } from './team-point.service';

@Controller('team-point')
export class TeamPointController {
  constructor(
    private readonly teamPointService: TeamPointService,
    private readonly optionsService: OptionsService,
  ) {}

  @Roles(USER_ROLE)
  @Get()
  async getPointByUser(
    @AuthUser('team') team: number,
  ): Promise<TeamPointEntity> {
    return await this.teamPointService.getPoint(team);
  }

  @Roles(ADMIN_ROLE, USER_ROLE)
  @Get('all')
  async getAllTeamPoint(): Promise<TeamPointEntity[]> {
    const teamPoints = await this.teamPointService.getAllTeamPoints();
    const teamCount = (await this.optionsService.getTeamCount()).optionValue;
    return teamPoints.slice(0, teamCount);
  }

  @Roles(ADMIN_ROLE)
  @Get(':team')
  async getPointByAdmin(@Param('team') team: number): Promise<TeamPointEntity> {
    return await this.teamPointService.getPoint(team);
  }

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<TeamPointEntity[]> {
    return await this.teamPointService.reset();
  }

  @Roles(ADMIN_ROLE)
  @Put('all')
  async updatePoints(
    @Body() { teamPoints }: UpdateTeamPointsDto,
  ): Promise<TeamPointEntity[]> {
    return await this.teamPointService.updatePoints(teamPoints);
  }

  @Roles(ADMIN_ROLE)
  @Put()
  async updatePoint(
    @Body() { team, point, pointType }: UpdateTeamPointDto,
  ): Promise<TeamPointEntity> {
    return await this.teamPointService.updatePoint({ team, point, pointType });
  }
}
