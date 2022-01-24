import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { PointTable } from 'src/types';
import { PointTableKeyDto, UpdatePointTableItemDto } from './point-table.dto';
import { PointTableEntity } from './point-table.entity';
import { PointTableService } from './point-table.service';

@Controller('point-table')
export class PointTableController {
  constructor(private readonly pointTableService: PointTableService) {}

  @Get()
  async getPointTable(): Promise<PointTable> {
    return await this.pointTableService.getAllItems();
  }

  @Get(':key')
  async getPointTableItem(
    @Param() { key }: PointTableKeyDto,
  ): Promise<PointTableEntity> {
    return await this.pointTableService.getPointTableItem(key);
  }

  @Roles('admin')
  @Put(':key')
  async updatePointTableItem(
    @Param() { key }: PointTableKeyDto,
    @Body() { point }: UpdatePointTableItemDto,
  ) {
    return await this.pointTableService.updatePointTableItem(key, point);
  }
}
