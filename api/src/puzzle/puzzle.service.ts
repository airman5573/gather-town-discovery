import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_TEAM, PUZZLE_COLS, PUZZLE_PLACE_HOLDER, PUZZLE_ROWS, TEAMS } from 'src/constants';
import { AlreadyOpenBoxException } from 'src/exceptions/already-open-box.exception';
import { NotEnoughPointException } from 'src/exceptions/not-enough-point.exception';
import { NotExistTeamException } from 'src/exceptions/not-exist-team.exception';
import { OptionsService } from 'src/options/options.service';
import { TeamPointService } from 'src/team-point/team-point.service';
import { PointTable, PointType, YesOrNo, Grid } from 'src/types';
import { consoleGrid, range, repeat3, threeInLine, zip } from 'src/utils/array';
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

  async isLetterBox(boxKey: string): Promise<boolean> {
    const { optionValue: shuffledPuzzleMessage } =
      await this.optionsService.getShuffledPuzzleMessageWithPlaceholder();
    const [row, col] = boxKey.split(':').map(Number);
    const boxNum = row * PUZZLE_COLS + col;
    if (
      shuffledPuzzleMessage[boxNum] &&
      shuffledPuzzleMessage[boxNum] !== PUZZLE_PLACE_HOLDER
    ) {
      return true;
    }
    return false;
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

  totalBingoCount(
    puzzleEntityList: Array<PuzzleEntity>,
    team: number,
    yx: Array<number>,
  ) {
    const openedBoxWithTeamMap = puzzleEntityList.reduce(
      (acc: { [k in string]: number }, cur: PuzzleEntity) => {
        const team = cur.team;
        cur.openedBoxList &&
          cur.openedBoxList.forEach((boxKey) => {
            acc[boxKey] = team;
          });
        return acc;
      },
      {},
    );

    const grid = range(0, PUZZLE_ROWS - 1).map((row) =>
      range(0, PUZZLE_COLS - 1).map((col) => {
        return openedBoxWithTeamMap[`${row}:${col}`] ?? 0;
      }),
    );

    const [y, x] = yx;
    const right = zip(repeat3(y), range(x + 1, x + 3));
    const left = zip(repeat3(y), range(x - 1, x - 3));
    const top = zip(range(y - 1, y - 3), repeat3(x));
    const bottom = zip(range(y + 1, y + 3), repeat3(x));
    const bottomLeft = zip(range(y + 1, y + 3), range(x - 1, x - 3));
    const bottomRight = zip(range(y + 1, y + 3), range(x + 1, x + 3));
    const topRight = zip(range(y - 1, y - 3), range(x + 1, x + 3));
    const topLeft = zip(range(y - 1, y - 3), range(x - 1, x - 3));

    const totalCount = [
      [left, right],
      [top, bottom],
      [topRight, bottomLeft],
      [topLeft, bottomRight],
    ].reduce((acc, [dir1, dir2]) => {
      acc += threeInLine(grid, dir1, dir2, team) ? 1 : 0;
      return acc;
    }, 0);

    return totalCount;
  }
}
