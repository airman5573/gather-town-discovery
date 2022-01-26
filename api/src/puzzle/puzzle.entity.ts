import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { ArrayStringToNumTransformer } from 'src/utils/array-string-to-num-transformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'puzzles' })
export class PuzzleEntity extends TeamBaseEntity {
  @Column({
    name: 'opened_box_list',
    type: 'simple-array',
    transformer: new ArrayStringToNumTransformer(),
  })
  openedBoxList: number[];
}
