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
import { ADMIN_ROLE, PUZZLE_COLS, PUZZLE_PLACE_HOLDER, USER_ROLE } from 'src/constants';
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
    private readonly teamPointSevice: TeamPointService,
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
    const puzzleEntity = await this.puzzleService.add(team, boxKey);
    const pointTable = await this.pointTableService.getAllItems();
    const { optionValue: shuffledPuzzleMessage } =
      await this.optionsService.getShuffledPuzzleMessageWithPlaceholder();
    const [row, col] = boxKey.split(':').map(Number);
    const boxNum = row * PUZZLE_COLS + col;
    let point = pointTable.openEmptyBox ?? 0;
    if (shuffledPuzzleMessage[boxNum] !== PUZZLE_PLACE_HOLDER) {
      point = pointTable.openLetterBox ?? 0;
    }
    await this.teamPointSevice.updatePoint({
      team,
      point,
      pointType: PointType.BoxOpen,
    });
    return puzzleEntity;
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
    await this.teamPointSevice.updatePoint({
      team,
      point: rewardPoint,
      pointType: PointType.SentenceDecryption,
    });
    return { rank };
  }
}
