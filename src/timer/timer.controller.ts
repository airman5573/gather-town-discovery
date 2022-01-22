import { LocalDateTime } from '@js-joda/core';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { CreateTimerDto, UpdateTimerDto } from './timer.dto';
import { TimerEntity } from './timer.entity';
import { TimerService } from './timer.service';

@Controller('timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Get(':team')
  async getTimer(@Param('team') team: number): Promise<TimerEntity> {
    return await this.timerService.findOne(team);
  }

  @Get('all')
  async getAllTimers(): Promise<TimerEntity[]> {
    console.log('getAllTimers is called');
    return await this.timerService.findAll();
  }

  @Roles('admin')
  @Put('/:team')
  async update(
    @Param('team') team: number,
    @Body() updateTimerDto: UpdateTimerDto,
  ): Promise<TimerEntity> {
    return await this.timerService.update(
      team,
      LocalDateTime.parse(updateTimerDto.startTime),
    );
  }

  @Roles('admin')
  @Post()
  async start(@Body() createTimerDto: CreateTimerDto): Promise<TimerEntity[]> {
    return await this.timerService.create(createTimerDto.teams);
  }

  @Roles('admin')
  @Put('reset')
  async reset(): Promise<TimerEntity[]> {
    return await this.timerService.reset();
  }
}
