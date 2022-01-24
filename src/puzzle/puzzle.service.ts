import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { AlreadyOpenBoxException } from 'src/exceptions/already-open-box.exception';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import { Repository } from 'typeorm';
import { PuzzleEntity } from './puzzle.entity';

@Injectable()
export class PuzzleService {
  constructor(
    @InjectRepository(PuzzleEntity)
    private readonly puzzleRepository: Repository<PuzzleEntity>,
  ) {}

  async getOpenedBoxList(team: number): Promise<PuzzleEntity> | undefined {
    return await this.puzzleRepository.findOne({ team });
  }
  async getAllOpendBoxList(): Promise<PuzzleEntity[]> {
    return await this.puzzleRepository.find({ order: { team: 'ASC' } });
  }

  async add(team: number, boxNum: number): Promise<PuzzleEntity[]> {
    const entity: PuzzleEntity = await this.getOpenedBoxList(team);
    if (!entity) {
      throw new NotExistTeamException();
    }
    if (entity.openedBoxList.some((_boxNum) => _boxNum === boxNum)) {
      throw new AlreadyOpenBoxException();
    }
    entity.openedBoxList.push(boxNum);
    await this.puzzleRepository.save(entity);
    return await this.getAllOpendBoxList();
  }

  async reset(): Promise<PuzzleEntity[]> {
    await this.puzzleRepository.clear();
    const entities: PuzzleEntity[] = [];
    for (const team of TEAMS) {
      const entity = this.puzzleRepository.create({
        team,
        openedBoxList: [],
      });
      entities.push(entity);
      await this.puzzleRepository.save(entity);
    }
    return entities;
  }
}
