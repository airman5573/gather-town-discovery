import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'team_points' })
export class TeamPointEntity extends TeamBaseEntity {
  @Column({
    name: 'usable_point',
    type: 'int',
    default: 0,
  })
  usablePoint: number;

  @Column({
    name: 'timer_point',
    type: 'int',
    default: 0,
  })
  timerPoint: number;

  @Column({
    name: 'box_open_point',
    type: 'int',
    default: 0,
  })
  boxOpenPoint: number;

  @Column({
    name: 'sentence_decryption_point',
    type: 'int',
    default: 0,
  })
  sentenceDecryptionPoint: number;
}
