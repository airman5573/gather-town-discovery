import { LocalDateTime } from '@js-joda/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
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

  async update(team: number, startTime: LocalDateTime) {
    const timer = await this.findOne(team);
    if (!timer) {
      throw new NotExistTeamException();
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

  async reset(): Promise<TimerEntity[]> {
    await this.timerRepository.clear();
    const entites = [];
    const startTime = LocalDateTime.now();
    for (const team of TEAMS) {
      const entity = this.timerRepository.create({
        team,
        startTime,
      });
      entites.push(entity);
      await this.timerRepository.save(entity);
    }
    return entites;
  }
}
