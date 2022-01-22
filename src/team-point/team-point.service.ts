import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import resetTable from 'src/utils/reset-table';
import { Repository } from 'typeorm';
import { TeamPointDto } from './team-point.dto';
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

  async updatePoint({
    team,
    point,
    pointType,
  }: TeamPointDto): Promise<TeamPointEntity> {
    const teamPoint = await this.getPoint(team);
    if (!teamPoint) {
      throw new NotExistTeamException();
    }
    teamPoint[pointType] += point;
    return await this.teamPointRepository.save(teamPoint);
  }

  async updatePoints(teamPoints: TeamPointDto[]): Promise<TeamPointEntity[]> {
    const entites: TeamPointEntity[] = [];
    for (const tp of teamPoints) {
      const entity = await this.updatePoint(tp);
      entites.push(entity);
    }
    return entites;
  }

  async reset(): Promise<TeamPointEntity[]> {
    return await resetTable(this.teamPointRepository);
  }
}
