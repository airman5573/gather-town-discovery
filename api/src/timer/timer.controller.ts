import { LocalDateTime } from '@js-joda/core';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { CreateTimerDto, UpdateTimerDto } from './timer.dto';
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

  @Roles(ADMIN_ROLE)
  @Post()
  async start(@Body() createTimerDto: CreateTimerDto): Promise<TimerEntity[]> {
    return await this.timerService.create(createTimerDto.teams);
  }
}
