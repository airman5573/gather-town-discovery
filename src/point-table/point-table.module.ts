import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointTableController } from './point-table.controller';
import { PointTableEntity } from './point-table.entity';
import { PointTableService } from './point-table.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointTableEntity])],
  controllers: [PointTableController],
  providers: [PointTableService],
  exports: [PointTableService],
})
export class PointTableModule {}
