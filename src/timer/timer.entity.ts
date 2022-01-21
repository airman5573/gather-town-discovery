import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from 'src/utils/local-datetime-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'timers' })
export class TimerEntity extends BaseEntity {
  @PrimaryColumn()
  team: number;

  @Column({
    name: 'start_time',
    type: 'datetime',
    transformer: new LocalDateTimeTransformer(),
  })
  startTime: LocalDateTime;
}
