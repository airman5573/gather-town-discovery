import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_TEAM, PUZZLE_COLS, PUZZLE_PLACE_HOLDER, TEAMS } from 'src/constants';
import { AlreadyOpenBoxException } from 'src/exceptions/already-open-box.exception';
import { NotEnoughPointException } from 'src/exceptions/not-enough-point.exception';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import { OptionsService } from 'src/options/options.service';
import { TeamPointService } from 'src/team-point/team-point.service';
import { PointTable, PointType, YesOrNo } from 'src/types';
import removeWhiteSpace from 'src/utils/remove-white-space';
import { Repository } from 'typeorm';
import { PuzzleEntity } from './puzzle.entity';

@Injectable()
export class PuzzleService {
  constructor(
    @InjectRepository(PuzzleEntity)
    private readonly puzzleRepository: Repository<PuzzleEntity>,
    private readonly optionsService: OptionsService,
    private readonly teamPointService: TeamPointService,
  ) {}

  async getOpenedBoxList(team: number): Promise<PuzzleEntity> | undefined {
    return await this.puzzleRepository.findOne({ team });
  }

  async getAllOpendBoxList(): Promise<PuzzleEntity[]> {
    return await this.puzzleRepository.find({ order: { team: 'ASC' } });
  }

  async add(team: number, boxKey: string): Promise<PuzzleEntity[]> {
    const entity: PuzzleEntity = await this.getOpenedBoxList(team);
    if (!entity) {
      throw new NotExistTeamException();
    }

    // 이미 열린 박스인지 체크한다(모든 팀을 체크한다)
    const allTeamOpenedBoxList = await this.getAllOpendBoxList();
    const isAlreadyOpened = allTeamOpenedBoxList.some(
      ({ openedBoxList }) =>
        openedBoxList !== null &&
        openedBoxList.some((_boxKey: string) => _boxKey === boxKey),
    );
    if (isAlreadyOpened) {
      throw new AlreadyOpenBoxException();
    }
    if (entity.openedBoxList === null) {
      entity.openedBoxList = [];
    }
    entity.openedBoxList.push(boxKey);
    await this.puzzleRepository.save(entity);
    return await this.getAllOpendBoxList();
  }

  async updateDidDescryptSentece(
    team: number,
    status: YesOrNo,
  ): Promise<PuzzleEntity> {
    const entity = await this.puzzleRepository.findOne({ team });
    entity.didDescryptSentence = status;
    return await this.puzzleRepository.save(entity);
  }

  async reset(): Promise<PuzzleEntity[]> {
    await this.puzzleRepository.clear();
    const entities: PuzzleEntity[] = [];
    for (const team of TEAMS) {
      const entity = this.puzzleRepository.create({
        team,
        openedBoxList: [],
        didDescryptSentence: YesOrNo.NO,
        rank: MAX_TEAM,
      });
      entities.push(entity);
      await this.puzzleRepository.save(entity);
    }
    return entities;
  }

  async isAnswer(sentence): Promise<boolean> {
    const option = await this.optionsService.getOriginalPuzzleMessage();
    const originalSentence = option.optionValue as string;
    return removeWhiteSpace(originalSentence) === removeWhiteSpace(sentence);
  }

  async didDescryptSentence(team): Promise<boolean> {
    const entity = await this.puzzleRepository.findOne({ team });
    return entity.didDescryptSentence === YesOrNo.YES;
  }

  async getRanks(): Promise<
    Pick<PuzzleEntity, 'team' | 'didDescryptSentence' | 'rank'>[]
  > {
    const ranks = await this.puzzleRepository.find({
      select: ['team', 'didDescryptSentence', 'rank'],
      order: {
        rank: 'ASC',
      },
    });
    return ranks;
  }

  async updateRank(
    team,
    rank,
  ): Promise<Pick<PuzzleEntity, 'team' | 'didDescryptSentence' | 'rank'>> {
    const entity = await this.puzzleRepository.findOne({ team });
    entity.didDescryptSentence = YesOrNo.YES;
    entity.rank = rank;
    return await this.puzzleRepository.save(entity);
  }

  async payForOpen(cost: number, team: number) {
    await this.teamPointService.updatePoint({
      team,
      point: cost * -1,
      pointType: PointType.Usable,
    });
  }

  async reward(pointTable: PointTable, team: number, boxKey: string) {
    const { optionValue: shuffledPuzzleMessage } =
      await this.optionsService.getShuffledPuzzleMessageWithPlaceholder();
    const [row, col] = boxKey.split(':').map(Number);
    const boxNum = row * PUZZLE_COLS + col;
    let point = pointTable.openEmptyBox ?? 0;
    if (
      shuffledPuzzleMessage[boxNum] &&
      shuffledPuzzleMessage[boxNum] !== PUZZLE_PLACE_HOLDER
    ) {
      point = pointTable.openLetterBox ?? 0;
    }
    await this.teamPointService.updatePoint({
      team,
      point,
      pointType: PointType.BoxOpen,
    });
  }
}
