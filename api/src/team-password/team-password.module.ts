import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from 'src/options/options.module';
import { TeamPasswordController } from './team-password.controller';
import { TeamPasswordEntity } from './team-password.entity';
import { TeamPasswordService } from './team-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPasswordEntity]), OptionsModule],
  controllers: [TeamPasswordController],
  providers: [TeamPasswordService],
  exports: [TeamPasswordService],
})
export class TeamPasswordModule {}
