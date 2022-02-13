import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import { TeamPointService } from 'src/team-point/team-point.service';
import { MissionUploadFileType, PointType, YesOrNo } from 'src/types';
import { Repository } from 'typeorm';
import { CheckDto } from './mission-upload.dto';
import { MissionUploadEntity } from './mission-upload.entity';

@Injectable()
export class MissionUploadService {
  constructor(
    @InjectRepository(MissionUploadEntity)
    private readonly missionUploadRepository: Repository<MissionUploadEntity>,
    private readonly teamPointService: TeamPointService,
  ) {}

  async getPostFileList(team: number): Promise<MissionUploadEntity> {
    return await this.missionUploadRepository.findOne({ team });
  }

  async getAllFileList(): Promise<MissionUploadEntity[]> {
    return await this.missionUploadRepository.find({ order: { team: 'ASC' } });
  }

  async addFile(
    team: number,
    post: number,
    filename: string,
  ): Promise<MissionUploadEntity> {
    const entity = await this.getPostFileList(team);
    if (!entity) {
      throw new NotExistTeamException();
    }
    const postArr = entity[`post${post}` as any] || [];
    postArr.push({
      team,
      post,
      filename,
      isCheckedByAdmin: YesOrNo.NO,
    });
    entity[`post${post}` as any] = postArr;
    return await this.missionUploadRepository.save(entity);
  }

  async reset(): Promise<MissionUploadEntity[]> {
    await this.missionUploadRepository.clear();
    const entities: MissionUploadEntity[] = [];
    for (const team of TEAMS) {
      const entity = this.missionUploadRepository.create({
        team,
        post1: [],
        post2: [],
        post3: [],
        post4: [],
        post5: [],
        post6: [],
        post7: [],
        post8: [],
        post9: [],
        post10: [],
      });
      entities.push(entity);
      await this.missionUploadRepository.save(entity);
    }
    return entities;
  }

  async check({
    team,
    post,
    point,
    filename,
  }: CheckDto): Promise<MissionUploadEntity> {
    await this.teamPointService.updatePoint({
      team,
      point,
      pointType: PointType.Usable,
    });
    const entity = await this.getPostFileList(team);
    if (!entity) {
      throw new NotExistTeamException();
    }
    const postArr = entity[`post${post}` as any] || [];
    const newPostArr = postArr.map((file: MissionUploadFileType) => {
      if (file.filename === filename) {
        file.isCheckedByAdmin = YesOrNo.YES;
      }
      return file;
    });
    entity[`post${post}` as any] = newPostArr;
    return await this.missionUploadRepository.save(entity);
  }
}
