import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PUZZLE_PLACE_HOLDER } from 'src/constants';
import { OptionsService } from 'src/options/options.service';
import { PuzzleService } from 'src/puzzle/puzzle.service';
import { TeamPointService } from 'src/team-point/team-point.service';
import { TeamStatisticsDto } from './statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly teamPointService: TeamPointService,
    private readonly puzzleService: PuzzleService,
    private readonly optionService: OptionsService,
  ) {}

  async getStatistics(): Promise<TeamStatisticsDto[]> {
    const statistics = [];
    const allTeamPoints = await this.teamPointService.getAllTeamPoints();
    const allTeamOpenedBoxList = await this.puzzleService.getAllOpendBoxList();
    const { optionValue: shuffledPuzzleMessageWithPlaceholder } =
      await this.optionService.getShuffledPuzzleMessageWithPlaceholder();
    const { optionValue: puzzleCount } =
      await this.optionService.getPuzzleCount();
    for (let i = 0; i < allTeamPoints.length; i += 1) {
      const teamPoint = allTeamPoints[i];
      const { team, openedBoxList } = allTeamOpenedBoxList[i];
      if (teamPoint.team !== team) {
        throw new InternalServerErrorException('팀설정이 잘못되었습니다');
      }

      // point 입력
      const teamStatistics = new TeamStatisticsDto();
      teamStatistics.team = teamPoint.team;
      teamStatistics.usable = teamPoint.usable;
      teamStatistics.timer = teamPoint.timer;
      teamStatistics.boxOpen = teamPoint.boxOpen;
      teamStatistics.sentenceDecryption = teamPoint.sentenceDecryption;
      teamStatistics.bingo = teamPoint.bingo;

      teamStatistics.openEmptyBoxCount = 0;
      teamStatistics.openLetterBoxCount = 0;
      // 일반구역/글자구역을 각각 몇개 열었는지 기록
      openedBoxList.forEach((boxNum) => {
        if (
          shuffledPuzzleMessageWithPlaceholder[boxNum] === PUZZLE_PLACE_HOLDER
        ) {
          teamStatistics.openEmptyBoxCount += 1;
        } else {
          teamStatistics.openLetterBoxCount += 1;
        }
      });
      teamStatistics.percentageOfBoxOpen = Math.floor(
        (teamStatistics.openEmptyBoxCount + teamStatistics.openLetterBoxCount) /
          parseInt(puzzleCount, 10),
      );
      teamStatistics.sumOfPoint =
        teamStatistics.usable +
        teamStatistics.timer +
        teamStatistics.boxOpen +
        teamStatistics.sentenceDecryption +
        teamStatistics.bingo;
      statistics.push(teamStatistics);
    }

    // 순위 입력
    statistics.sort(
      (a: TeamStatisticsDto, b: TeamStatisticsDto) =>
        b.sumOfPoint - a.sumOfPoint,
    );
    statistics[0].contributionRank = 1;
    for (let i = 0; i < statistics.length - 1; i += 1) {
      statistics[i + 1].contributionRank = statistics[i].contributionRank + 1;
      if (statistics[i].sumOfPoint === statistics[i + 1].sumOfPoint) {
        statistics[i + 1].contributionRank = statistics[i].contributionRank;
      }
    }
    statistics.sort(
      (a: TeamStatisticsDto, b: TeamStatisticsDto) => a.team - b.team,
    );

    return statistics;
  }
}
