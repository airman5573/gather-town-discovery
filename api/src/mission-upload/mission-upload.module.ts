import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPointModule } from 'src/team-point/team-point.module';
import { MissionUploadController } from './mission-upload.controller';
import { MissionUploadEntity } from './mission-upload.entity';
import { MissionUploadService } from './mission-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([MissionUploadEntity]), TeamPointModule],
  controllers: [MissionUploadController],
  providers: [MissionUploadService],
  exports: [MissionUploadService],
})
export class MissionUploadModule {}
