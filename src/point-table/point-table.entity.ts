import { PointTableKey } from 'src/types';
import { camelCaseToUnder_score } from 'src/utils/camelCaseToUnder_score';
import { under_scoreToCamelCase } from 'src/utils/under_score-to-camelCase';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'point_table' })
export class PointTableEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    transformer: {
      to: (entityValue: PointTableKey) => camelCaseToUnder_score(entityValue),
      from: (databaseValue: string) => under_scoreToCamelCase(databaseValue),
    },
    default: 0,
  })
  key: PointTableKey;

  @Column()
  point: number;
}
