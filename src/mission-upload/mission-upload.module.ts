import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionUploadController } from './mission-upload.controller';
import { MissionUploadEntity } from './mission-upload.entity';
import { MissionUploadService } from './mission-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([MissionUploadEntity])],
  controllers: [MissionUploadController],
  providers: [MissionUploadService],
  exports: [],
})
export class MissionUploadModule {}
