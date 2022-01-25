import { Module } from '@nestjs/common';
import { OptionsModule } from 'src/options/options.module';
import { PuzzleModule } from 'src/puzzle/puzzle.module';
import { TeamPointModule } from 'src/team-point/team-point.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TeamPointModule, PuzzleModule, OptionsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [],
})
export class StatisticsModule {}
