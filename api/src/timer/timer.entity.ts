import { LocalDateTime } from '@js-joda/core';
import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { LocalDateTimeTransformer } from 'src/utils/local-datetime-transformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'timers' })
export class TimerEntity extends TeamBaseEntity {
  @Column({
    name: 'start_time',
    type: 'datetime',
    transformer: new LocalDateTimeTransformer(),
  })
  startTime: LocalDateTime;
}
