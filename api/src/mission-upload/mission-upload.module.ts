import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointTableModule } from 'src/point-table/point-table.module';
import { TeamPointModule } from 'src/team-point/team-point.module';
import { TimerModule } from 'src/timer/timer.module';
import { MissionUploadController } from './mission-upload.controller';
import { MissionUploadEntity } from './mission-upload.entity';
import { MissionUploadService } from './mission-upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MissionUploadEntity]),
    TeamPointModule,
    PointTableModule,
    TimerModule,
  ],
  controllers: [MissionUploadController],
  providers: [MissionUploadService],
  exports: [MissionUploadService],
})
export class MissionUploadModule {}
