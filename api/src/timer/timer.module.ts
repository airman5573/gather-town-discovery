import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from 'src/options/options.module';
import { PointTableModule } from 'src/point-table/point-table.module';
import { TeamPointModule } from 'src/team-point/team-point.module';
import { TimerController } from './timer.controller';
import { TimerEntity } from './timer.entity';
import { TimerService } from './timer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimerEntity]),
    OptionsModule,
    TeamPointModule,
    PointTableModule,
  ],
  controllers: [TimerController],
  providers: [TimerService],
  exports: [TimerService],
})
export class TimerModule {}
