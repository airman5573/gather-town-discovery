import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'mission_uploads' })
export class MissionUploadEntity extends TeamBaseEntity {
  @Column({
    type: 'simple-array',
    name: 'post_1',
  })
  post1: string[];

  @Column({
    type: 'simple-array',
    name: 'post_2',
  })
  post2: string[];

  @Column({
    type: 'simple-array',
    name: 'post_3',
  })
  post3: string[];

  @Column({
    type: 'simple-array',
    name: 'post_4',
  })
  post4: string[];

  @Column({
    type: 'simple-array',
    name: 'post_5',
  })
  post5: string[];

  @Column({
    type: 'simple-array',
    name: 'post_6',
  })
  post6: string[];

  @Column({
    type: 'simple-array',
    name: 'post_7',
  })
  post7: string[];

  @Column({
    type: 'simple-array',
    name: 'post_8',
  })
  post8: string[];

  @Column({
    type: 'simple-array',
    name: 'post_9',
  })
  post9: string[];

  @Column({
    type: 'simple-array',
    name: 'post_10',
  })
  post10: string[];
}
