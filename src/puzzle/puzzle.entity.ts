import { ArrayStringToNumTransformer } from 'src/utils/array-string-to-num-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'puzzles' })
export class PuzzleEntity extends BaseEntity {
  @PrimaryColumn()
  team: number;

  @Column({
    name: 'open_boxes',
    type: 'simple-array',
    transformer: new ArrayStringToNumTransformer(),
  })
  openBoxes: number[];
}
