import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from 'src/options/options.module';
import { TeamPointController } from './team-point.controller';
import { TeamPointEntity } from './team-point.entity';
import { TeamPointService } from './team-point.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPointEntity]), OptionsModule],
  controllers: [TeamPointController],
  providers: [TeamPointService],
  exports: [TeamPointService],
})
export class TeamPointModule {}
