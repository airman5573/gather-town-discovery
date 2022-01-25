import { PickType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsPositive } from 'class-validator';
import { PointTableKey } from 'src/types';
import { hyphenToCamelCase } from 'src/utils/hyphen-to-camelCase';

export class PointTableKeyDto {
  @Transform(({ value }) => hyphenToCamelCase(value))
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
