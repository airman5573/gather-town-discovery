import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from 'src/options/options.module';
import { PointTableModule } from 'src/point-table/point-table.module';
import { TeamPointModule } from 'src/team-point/team-point.module';
import { PuzzleController } from './puzzle.controller';
import { PuzzleEntity } from './puzzle.entity';
import { PuzzleService } from './puzzle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PuzzleEntity]),
    OptionsModule,
    PointTableModule,
    TeamPointModule,
  ],
  controllers: [PuzzleController],
  providers: [PuzzleService],
  exports: [PuzzleService],
})
export class PuzzleModule {}
