import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import { Repository } from 'typeorm';
import { MissionUploadEntity } from './mission-upload.entity';

@Injectable()
export class MissionUploadService {
  constructor(
    @InjectRepository(MissionUploadEntity)
    private readonly missionUploadRepository: Repository<MissionUploadEntity>,
  ) {}

  async getPostFileList(team: number): Promise<MissionUploadEntity> {
    return await this.missionUploadRepository.findOne({ team });
  }

  async getAllFileList(): Promise<MissionUploadEntity[]> {
    return await this.missionUploadRepository.find();
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
      isCheckedByAdmin: false,
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
}
