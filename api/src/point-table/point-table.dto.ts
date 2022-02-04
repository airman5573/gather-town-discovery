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
  @IsPositive({
    message: '0이상의 점수를 입력해 주세요',
  })
  point: number;
}

export class UpdatePointTableItemDto extends PickType(PointTableDto, [
  'point',
] as const) {}
