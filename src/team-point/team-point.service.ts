import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import { PointType } from 'src/types';
import resetTable from 'src/utils/reset-table';
import { Repository } from 'typeorm';
import { TeamPointEntity } from './team-point.entity';

@Injectable()
export class TeamPointService {
  constructor(
    @InjectRepository(TeamPointEntity)
    private readonly teamPointRepository: Repository<TeamPointEntity>,
  ) {}

  async getAllTeamPoints(): Promise<TeamPointEntity[]> {
    return await this.teamPointRepository.find();
  }

  async getPoint(team: number): Promise<TeamPointEntity> {
    const teamPoint = await this.teamPointRepository.findOne({ team });
    if (!teamPoint) {
      throw new NotExistTeamException();
    }
    return teamPoint;
  }

  async updatePoint(
    team: number,
    pointType: PointType,
    point: number,
  ): Promise<TeamPointEntity> {
    const teamPoint = await this.getPoint(team);
    if (!teamPoint) {
      throw new NotExistTeamException();
    }
    teamPoint[pointType] += point;
    return await this.teamPointRepository.save(teamPoint);
  }

  async reset(): Promise<TeamPointEntity[]> {
    return await resetTable(this.teamPointRepository);
  }
}
