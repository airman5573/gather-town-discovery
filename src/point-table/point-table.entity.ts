import { PointTableKey } from 'src/types';
import { UnderscoreToCamelCaseTransformer } from 'src/utils/under_score-to-camelCase-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'point_table' })
export class PointTableEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    transformer: new UnderscoreToCamelCaseTransformer(),
  })
  key: PointTableKey;

  @Column()
  point: number;
}
