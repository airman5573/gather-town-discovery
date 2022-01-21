import { LocalDateTime } from '@js-joda/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamNotExistException } from 'src/exceptions/team-not-exist.exception';
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
    return this.timerRepository.find();
  }

  async update(team: number, startTime: LocalDateTime) {
    const timer = await this.findOne(team);
    if (!timer) {
      throw new TeamNotExistException();
    }
    return await this.timerRepository.save(
      this.timerRepository.create({
        team,
        startTime,
      }),
    );
  }

  async create(teams: number[]): Promise<TimerEntity[]> {
    const timers = [];
    for (const team of teams) {
      const timer = await this.findOne(team);
      const result = await this.timerRepository.save(
        this.timerRepository.create({
          team: timer?.team || team,
          startTime: LocalDateTime.now(),
        }),
      );
      timers.push(result);
    }
    return timers;
  }
}
