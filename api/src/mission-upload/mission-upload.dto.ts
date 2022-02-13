import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';

export class UploadMissionFileDto {
  @Type(() => Number)
  @IsPositive()
  team: number;

  @Type(() => Number)
  @IsPositive()
  @Max(10, {
    message: '10포스트를 넘는 포스트는 존재하지 않습니다',
  })
  post: number;
}

export class CheckDto {
  @Type(() => Number)
  @IsPositive()
  team: number;

  @Type(() => Number)
  @IsPositive()
  @Max(10, {
    message: '10포스트를 넘는 포스트는 존재하지 않습니다',
  })
  post: number;

  @Type(() => Number)
  @IsNumber(undefined, {
    message: '점수는 숫자만 입력 가능합니다',
  })
  point: number;

  @IsNotEmpty({
    message: '파일이름이 비어있습니다',
  })
  filename: string;
}
