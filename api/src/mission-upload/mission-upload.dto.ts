import { Type } from 'class-transformer';
import { IsPositive, Max } from 'class-validator';

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
