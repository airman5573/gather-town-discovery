import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE, PUZZLE_COLS, PUZZLE_PLACE_HOLDER, USER_ROLE, PUZZLE_ROWS} from 'src/constants';
import { NotEnoughPointException } from 'src/exceptions/not-enough-point.exception';
import { OptionsService } from 'src/options/options.service';
import { PointTableService } from 'src/point-table/point-table.service';
import { TeamPointEntity } from 'src/team-point/team-point.entity';
import { TeamPointService } from 'src/team-point/team-point.service';
import { PointTableKey, PointType, YesOrNo } from 'src/types';
import { DescryptSentenceDto, OpenPuzzleDto } from './puzzle.dto';
import { PuzzleEntity } from './puzzle.entity';
import { PuzzleService } from './puzzle.service';

@Controller('puzzle')
export class PuzzleController {
  constructor(
    private readonly puzzleService: PuzzleService,
    private readonly optionsService: OptionsService,
    private readonly pointTableService: PointTableService,
    private readonly teamPointService: TeamPointService,
  ) {}

  @Get('all')
  async getAllOpenedBoxList(): Promise<PuzzleEntity[]> {
    return await this.puzzleService.getAllOpendBoxList();
  }

  @Get(':team')
  async getOpenedBoxList(@Param('team') team: number): Promise<PuzzleEntity> {
    return await this.puzzleService.getOpenedBoxList(team);
  }

  @Roles(USER_ROLE)
  @Put('open')
  async openPuzzle(
    @Body() { team, boxKey }: OpenPuzzleDto,
  ): Promise<PuzzleEntity[]> {
    const pointTable = await this.pointTableService.getAllItems();

    // 돈 부족하면 stop
    const cost = pointTable.openBoxCost ?? 0;
    const teamPoint = await this.teamPointService.getPoint(team);
    if (teamPoint.usable < cost) {
      throw new NotEnoughPointException();
    }

    // 퍼즐을 열어본다 (이미 열려있으면 못연다)
    const puzzleEntityList = await this.puzzleService.add(team, boxKey);

    // 비용을 지불한다
    await this.puzzleService.payForOpen(cost, team);

    // 3목 만들었는지 확인
    const bingoCount = this.puzzleService.totalBingoCount(
      puzzleEntityList,
      team,
      boxKey.split(':').map(Number),
    );

    // 연 박스가 글자 박스인지 확인
    const isLetterBox = await this.puzzleService.isLetterBox(boxKey);

    // 점수를 부여한다
    const point =
      (pointTable.bingo ?? 0) * bingoCount + // bingo 맞춘 점수
      Number(isLetterBox) * (pointTable.openLetterBox ?? 0) + // 글자박스 열었을때 얻는 점수
      Number(!isLetterBox) * (pointTable.openEmptyBox ?? 0); // 일반 박스 열었을때 얻는 점수
    await this.teamPointService.updatePoint({
      team,
      point,
      pointType: PointType.BoxOpen,
    });

    return puzzleEntityList;
  }

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<PuzzleEntity[]> {
    return await this.puzzleService.reset();
  }

  @Roles(USER_ROLE)
  @Post('descrypt-sentence')
  async descryptSentence(
    @Body() { team, sentence }: DescryptSentenceDto,
  ): Promise<{ rank: number }> {
    // 문장해독이 가능한 상태인지 체크한다
    const { optionValue: canSubmit } =
      await this.optionsService.getCanSubmitDescryptedSentence();
    if (canSubmit === YesOrNo.NO) {
      throw new BadRequestException(null, '아직 제출할 수 없습니다');
    }

    // 이미 정답을 맞추었는지 확인한다
    const didDescryptSentence = await this.puzzleService.didDescryptSentence(
      team,
    );
    if (didDescryptSentence) {
      throw new BadRequestException(null, '이미 정답을 맞추셨습니다');
    }

    // 정답인지 먼저 검사해야지
    const isAnswer = await this.puzzleService.isAnswer(sentence);
    if (!isAnswer) {
      throw new BadRequestException(null, '정답이 아닙니다');
    }

    // 등수를 결정한다
    const ranks = await this.puzzleService.getRanks();
    const rank =
      ranks.filter((entity) => entity.didDescryptSentence === YesOrNo.YES)
        .length + 1;
    await this.puzzleService.updateRank(team, rank);

    // 점수를 부여한다
    const { point } = await this.pointTableService.getPointTableItem(
      PointTableKey.DescryptSentence,
    );
    const minusPoint = Math.floor(point * 0.1);
    const rewardPoint = point - minusPoint * (rank - 1);
    await this.teamPointService.updatePoint({
      team,
      point: rewardPoint,
      pointType: PointType.SentenceDecryption,
    });
    return { rank };
  }
}
