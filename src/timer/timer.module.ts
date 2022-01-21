import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerController } from './timer.controller';
import { TimerEntity } from './timer.entity';
import { TimerService } from './timer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimerEntity])],
  controllers: [TimerController],
  providers: [TimerService],
  exports: [],
})
export class TimerModule {}
