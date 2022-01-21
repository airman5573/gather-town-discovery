import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { BoxAlreadyOpenException } from 'src/exceptions/box-already-open.exception';
import { TeamNotExistException } from 'src/exceptions/team-not-exist.exception';
import { Repository } from 'typeorm';
import { PuzzleEntity } from './puzzle.entity';

@Injectable()
export class PuzzleService {
  constructor(
    @InjectRepository(PuzzleEntity)
    private readonly puzzleRepository: Repository<PuzzleEntity>,
  ) {}

  async findOne(team: number): Promise<PuzzleEntity> | undefined {
    return await this.puzzleRepository.findOne({ team });
  }
  async findAll(): Promise<PuzzleEntity[]> {
    return await this.puzzleRepository.find();
  }

  async add(team: number, boxNum: number): Promise<PuzzleEntity[]> {
    const entity: PuzzleEntity = await this.findOne(team);
    if (!entity) {
      throw new TeamNotExistException();
    }
    if (entity.openBoxes.some((_boxNum) => _boxNum === boxNum)) {
      throw new BoxAlreadyOpenException();
    }
    entity.openBoxes.push(boxNum);
    await this.puzzleRepository.save(entity);
    return await this.findAll();
  }

  async reset(): Promise<PuzzleEntity[]> {
    await this.puzzleRepository.clear();
    const entities: PuzzleEntity[] = [];
    for (const team of TEAMS) {
      const entity = this.puzzleRepository.create({
        team,
        openBoxes: [],
      });
      entities.push(entity);
      await this.puzzleRepository.save(entity);
    }
    return entities;
  }
}
