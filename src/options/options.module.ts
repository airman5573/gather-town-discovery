import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsController } from './options.controller';
import { Options } from './options.entity';
import { OptionsService } from './options.service';

@Module({
  imports: [TypeOrmModule.forFeature([Options])],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
