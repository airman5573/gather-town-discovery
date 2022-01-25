import { PickType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsPositive } from 'class-validator';
import { PointTableKey } from 'src/types';
import { hyphenToUnderscoreTransformer } from 'src/utils/hyphen-to-under_score-transformer';

export class PointTableKeyDto {
  @Transform(({ value }) => hyphenToUnderscoreTransformer(value))
  @IsEnum(PointTableKey)
  key: PointTableKey;
}

export class PointTableDto extends PointTableKeyDto {
  @Type(() => Number)
  @IsPositive()
  point: number;
}

export class UpdatePointTableItemDto extends PickType(PointTableDto, [
  'point',
] as const) {}
