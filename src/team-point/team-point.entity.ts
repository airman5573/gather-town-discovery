import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'team_points' })
export class TeamPointEntity extends TeamBaseEntity {
  @Column({
    name: 'usable',
    type: 'int',
    default: 0,
  })
  usable: number;

  @Column({
    name: 'timer',
    type: 'int',
    default: 0,
  })
  timer: number;

  @Column({
    name: 'box_open',
    type: 'int',
    default: 0,
  })
  boxOpen: number;

  @Column({
    name: 'sentence_decryption',
    type: 'int',
    default: 0,
  })
  sentenceDecryption: number;
}
