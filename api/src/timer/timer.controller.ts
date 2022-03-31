import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { OptionsService } from 'src/options/options.service';
import { PointTableService } from 'src/point-table/point-table.service';
import { TeamPointService } from 'src/team-point/team-point.service';
import { PointType } from 'src/types';
import { StartTimerDto, StopTimerDto } from './timer.dto';
import { TimerEntity } from './timer.entity';
import { TimerService } from './timer.service';

@Controller('timer')
export class TimerController {
  constructor(
    private readonly timerService: TimerService,
    private readonly optionsService: OptionsService,
    private readonly teamPointService: TeamPointService,
    private readonly pointTableService: PointTableService,
  ) {}

  @Get('all')
  async getAllTimers(): Promise<TimerEntity[]> {
    const timers = await this.timerService.findAll();
    const teamCount = (await this.optionsService.getTeamCount()).optionValue;
    return timers.slice(0, teamCount);
  }

  @Get(':team')
  async getTimer(@Param('team') team: number): Promise<TimerEntity> {
    return await this.timerService.findOne(team);
  }

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<TimerEntity[]> {
    return await this.timerService.reset();
  }

  @Roles(ADMIN_ROLE)
  @Put('stop')
  async stop(@Body() stopTimerDto: StopTimerDto): Promise<TimerEntity> {
    const { team } = stopTimerDto;
    const { optionValue: lapTime } = await this.optionsService.getLapTime();
    const { timerPlus, timerMinus } =
      await this.pointTableService.getAllItems();
    const diff = await this.timerService.getTimeDiff(team);
    const lapTimeDiff = lapTime - diff;
    const point =
      lapTimeDiff < 0
        ? Math.ceil(lapTimeDiff / 30) * timerMinus
        : Math.floor(lapTimeDiff / 30) * timerPlus;
    await this.teamPointService.updatePoint({
      team,
      point,
      pointType: PointType.Timer,
    });
    return await this.timerService.stop(team);
  }

  @Roles(ADMIN_ROLE)
  @Put('start')
  async start(@Body() startTimerDto: StartTimerDto): Promise<TimerEntity[]> {
    return await this.timerService.start(startTimerDto.teams);
  }
}
