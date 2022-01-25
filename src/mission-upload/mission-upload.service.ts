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

  async getFileList(team: number): Promise<MissionUploadEntity> {
    return await this.missionUploadRepository.findOne({ team });
  }

  async getAllFileList(): Promise<MissionUploadEntity[]> {
    return await this.missionUploadRepository.find();
  }

  async addFile(team: number, filename: string): Promise<MissionUploadEntity> {
    const entity = await this.getFileList(team);
    if (!entity) {
      throw new NotExistTeamException();
    }
    entity.fileList.push(`${process.env.USER_UPLOAD_PATH}/${filename}`);
    return await this.missionUploadRepository.save(entity);
  }

  async reset(): Promise<MissionUploadEntity[]> {
    await this.missionUploadRepository.clear();
    const entities: MissionUploadEntity[] = [];
    for (const team of TEAMS) {
      const entity = this.missionUploadRepository.create({
        team,
        fileList: [],
      });
      entities.push(entity);
      await this.missionUploadRepository.save(entity);
    }
    return entities;
  }
}
