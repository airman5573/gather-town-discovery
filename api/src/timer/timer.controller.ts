import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { StartTimerDto, StopTimerDto } from './timer.dto';
import { TimerEntity } from './timer.entity';
import { TimerService } from './timer.service';

@Controller('timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Get('all')
  async getAllTimers(): Promise<TimerEntity[]> {
    return await this.timerService.findAll();
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
    return await this.timerService.stop(stopTimerDto.team);
  }

  @Roles(ADMIN_ROLE)
  @Post()
  async start(@Body() startTimerDto: StartTimerDto): Promise<TimerEntity[]> {
    return await this.timerService.start(startTimerDto.teams);
  }
}
