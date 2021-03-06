import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointTable, PointTableKey } from 'src/types';
import { Repository } from 'typeorm';
import { PointTableEntity } from './point-table.entity';

@Injectable()
export class PointTableService {
  constructor(
    @InjectRepository(PointTableEntity)
    private readonly pointTableRepository: Repository<PointTableEntity>,
  ) {}

  async getAllItems(): Promise<PointTable> {
    const items = await this.pointTableRepository.find();
    return items.reduce((acc: PointTable, { key, point }) => {
      acc[key] = point;
      return acc;
    }, {});
  }

  async getPointTableItem(key: PointTableKey): Promise<PointTableEntity> {
    return await this.pointTableRepository.findOne({ key });
  }

  async updatePointTableItem(
    key: PointTableKey,
    point: number,
  ): Promise<PointTableEntity> {
    const pointTableItem = await this.getPointTableItem(key);
    const item = await this.pointTableRepository.save(
      this.pointTableRepository.create({
        id: pointTableItem?.id,
        key,
        point,
      }),
    );
    return item;
  }

  async reset() {
    const promises = [
      this.updatePointTableItem(PointTableKey.TimerPlus, 100),
      this.updatePointTableItem(PointTableKey.TimerMinus, 100),
      this.updatePointTableItem(PointTableKey.Upload, 0),
      this.updatePointTableItem(PointTableKey.OpenBoxCost, 1000),
      this.updatePointTableItem(PointTableKey.OpenEmptyBox, 2000),
      this.updatePointTableItem(PointTableKey.OpenLetterBox, 4000),
      this.updatePointTableItem(PointTableKey.Bingo, 1000),
      this.updatePointTableItem(PointTableKey.DescryptSentence, 20000),
    ];
    const results = await Promise.all(promises);
    return results.reduce((acc: PointTable, { key, point }) => {
      acc[key] = point;
      return acc;
    }, {});
  }
}
