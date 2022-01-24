import { PointTableKey } from 'src/types';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'point_table' })
export class PointTableEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: PointTableKey;

  @Column()
  point: number;
}
