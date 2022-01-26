import { Controller, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { MissionUploadService } from 'src/mission-upload/mission-upload.service';
import { OptionsService } from 'src/options/options.service';
import { PointTableService } from 'src/point-table/point-table.service';
import { PuzzleService } from 'src/puzzle/puzzle.service';
import { TeamPasswordService } from 'src/team-password/team-password.service';
import { TeamPointService } from 'src/team-point/team-point.service';
import { TimerService } from 'src/timer/timer.service';

@Controller('reset')
export class ResetController {
  constructor(
    private readonly pointTableService: PointTableService,
    private readonly optionsService: OptionsService,
    private readonly puzzleService: PuzzleService,
    private readonly teamPasswordService: TeamPasswordService,
    private readonly teamPointService: TeamPointService,
    private readonly timerService: TimerService,
    private readonly missionUploadService: MissionUploadService,
  ) {}

  @Roles('admin')
  @Put()
  async reset() {
    const pointTable = await this.pointTableService.reset();
    const options = await this.optionsService.reset();
    const puzzles = await this.puzzleService.reset();
    const teamPasswords = await this.teamPasswordService.reset();
    const points = await this.teamPointService.reset();
    const timers = await this.timerService.reset();
    const missionUploads = await this.missionUploadService.reset();
    return {
      pointTable,
      options,
      puzzles,
      teamPasswords,
      points,
      timers,
      missionUploads,
    };
  }
}
