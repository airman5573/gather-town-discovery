import { Module } from '@nestjs/common';
import { OptionsModule } from 'src/options/options.module';
import { PointTableModule } from 'src/point-table/point-table.module';
import { PuzzleModule } from 'src/puzzle/puzzle.module';
import { TeamPasswordModule } from 'src/team-password/team-password.module';
import { TeamPointModule } from 'src/team-point/team-point.module';
import { TimerModule } from 'src/timer/timer.module';
import { MissionUploadModule } from 'src/mission-upload/mission-upload.module';
import { ResetController } from './reset.controller';

@Module({
  imports: [
    OptionsModule,
    PointTableModule,
    PuzzleModule,
    TeamPasswordModule,
    TeamPointModule,
    TimerModule,
    MissionUploadModule,
  ],
  controllers: [ResetController],
  providers: [],
  exports: [],
})
export class ResetModule {}
