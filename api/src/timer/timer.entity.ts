import { LocalDateTime } from '@js-joda/core';
import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { YesOrNo } from 'src/types';
import { LocalDateTimeTransformer } from 'src/utils/local-datetime-transformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'timers' })
export class TimerEntity extends TeamBaseEntity {
  @Column({
    name: 'start_time',
    type: 'timestamptz',
    transformer: new LocalDateTimeTransformer(),
  })
  startTime: LocalDateTime;

  @Column({
    name: 'is_running',
    type: 'text',
  })
  isRunning: YesOrNo;

  @Column({
    name: 'can_upload',
    type: 'text',
  })
  canUpload: YesOrNo;
}
