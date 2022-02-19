import { MAX_TEAM, TEAMS } from 'src/constants';
import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { YesOrNo } from 'src/types';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'puzzles' })
export class PuzzleEntity extends TeamBaseEntity {
  @Column({
    name: 'opened_box_list',
    type: 'text',
    array: true,
    nullable: true,
  })
  openedBoxList: string[];

  @Column({
    name: 'did_descrypt_sentence',
    type: 'text',
    nullable: true,
  })
  didDescryptSentence: YesOrNo;

  @Column({
    name: 'rank',
    type: 'int',
    default: 10,
  })
  rank: number;
}
