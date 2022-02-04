import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
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

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<PointTable> {
    return await this.pointTableService.reset();
  }

  @Roles(ADMIN_ROLE)
  @Put(':key')
  async updatePointTableItem(
    @Param() { key }: PointTableKeyDto,
    @Body() { point }: UpdatePointTableItemDto,
  ): Promise<PointTableEntity> {
    return await this.pointTableService.updatePointTableItem(key, point);
  }
}
