import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { AlreadyOpenBoxException } from 'src/exceptions/already-open-box.exception';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import { OptionsService } from 'src/options/options.service';
import { Repository } from 'typeorm';
import { PuzzleEntity } from './puzzle.entity';

@Injectable()
export class PuzzleService {
  constructor(
    @InjectRepository(PuzzleEntity)
    private readonly puzzleRepository: Repository<PuzzleEntity>,
    private readonly optionsService: OptionsService,
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

    const { optionValue: puzzleCount } =
      await this.optionsService.getPuzzleCount();

    // 열려고 하는 박스가 puzzle count보다 크면 안된다
    if (boxNum >= puzzleCount) {
      throw new BadRequestException('허용하지 않는 범위값입니다');
    }

    // 이미 열린 박스인지 체크한다(모든 팀을 체크한다)
    const allTeamOpenedBoxList = await this.getAllOpendBoxList();
    if (
      allTeamOpenedBoxList.some(({ openedBoxList }) =>
        openedBoxList.some((_boxNum: number) => _boxNum === boxNum),
      )
    ) {
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
