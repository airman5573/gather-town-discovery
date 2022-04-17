import { ChronoUnit, LocalDateTime } from '@js-joda/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { YesOrNo } from 'src/types';
import { Repository } from 'typeorm';
import { TimerEntity } from './timer.entity';

@Injectable()
export class TimerService {
  constructor(
    @InjectRepository(TimerEntity)
    private readonly timerRepository: Repository<TimerEntity>,
  ) {}

  async findOne(team: number): Promise<TimerEntity | undefined> {
    return await this.timerRepository.findOne({ team });
  }

  async findAll(): Promise<TimerEntity[]> {
    return this.timerRepository.find({ order: { team: 'ASC' } });
  }

  async start(teams: number[]): Promise<TimerEntity[]> {
    const timers = [];
    for (const team of teams) {
      const timer = await this.findOne(team);
      const result = await this.timerRepository.save(
        this.timerRepository.create({
          team: timer?.team || team,
          startTime: LocalDateTime.now(),
          isRunning: YesOrNo.YES,
        }),
      );
      timers.push(result);
    }
    return timers;
  }

  async reset(): Promise<TimerEntity[]> {
    await this.timerRepository.clear();
    const entites = [];
    const startTime = LocalDateTime.now();
    for (const team of TEAMS) {
      const entity = this.timerRepository.create({
        team,
        startTime,
        isRunning: YesOrNo.NO,
        canUpload: YesOrNo.YES,
      });
      entites.push(entity);
      await this.timerRepository.save(entity);
    }
    return entites;
  }

  async getTimeDiff(team): Promise<number> {
    const { startTime } = await this.findOne(team);
    const now = LocalDateTime.now();
    return startTime.until(now, ChronoUnit.SECONDS);
  }

  async stop(team: number): Promise<TimerEntity> {
    const timer = await this.findOne(team);
    return await this.timerRepository.save(
      this.timerRepository.create({
        ...timer,
        isRunning: YesOrNo.NO,
        canUpload: YesOrNo.YES,
      }),
    );
  }

  async disableUpload(team: number): Promise<TimerEntity> {
    const timer = await this.findOne(team);
    return await this.timerRepository.save(
      this.timerRepository.create({
        ...timer,
        canUpload: YesOrNo.NO,
      }),
    );
  }
}
