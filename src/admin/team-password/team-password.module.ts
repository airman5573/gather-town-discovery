import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPasswordController } from './team-password.controller';
import { TeamPassword } from './team-password.entity';
import { TeamPasswordService } from './team-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPassword])],
  controllers: [TeamPasswordController],
  providers: [TeamPasswordService],
  exports: [TeamPasswordService],
})
export class TeamPasswordModule {}
