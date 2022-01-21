import { LocalDateTime } from '@js-joda/core';
import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { LocalDateTimeTransformer } from 'src/utils/local-datetime-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'timers' })
export class TimerEntity extends TeamBaseEntity {
  @PrimaryColumn()
  team: number;

  @Column({
    name: 'start_time',
    type: 'datetime',
    transformer: new LocalDateTimeTransformer(),
  })
  startTime: LocalDateTime;
}
