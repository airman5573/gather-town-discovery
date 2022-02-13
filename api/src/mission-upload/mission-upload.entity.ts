import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { MissionUploadFileType } from 'src/types';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'mission_uploads' })
export class MissionUploadEntity extends TeamBaseEntity {
  @Column({
    type: 'jsonb',
    name: 'post_1',
    nullable: true,
  })
  post1: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_2',
    nullable: true,
  })
  post2: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_3',
    nullable: true,
  })
  post3: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_4',
    nullable: true,
  })
  post4: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_5',
    nullable: true,
  })
  post5: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_6',
    nullable: true,
  })
  post6: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_7',
    nullable: true,
  })
  post7: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_8',
    nullable: true,
  })
  post8: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_9',
    nullable: true,
  })
  post9: MissionUploadFileType[];

  @Column({
    type: 'jsonb',
    name: 'post_10',
    nullable: true,
  })
  post10: MissionUploadFileType[];
}
