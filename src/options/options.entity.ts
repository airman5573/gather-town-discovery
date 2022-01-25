import { OptionKey } from 'src/types';
import { camelCaseToUnder_score } from 'src/utils/camelCaseToUnder_score';
import { under_scoreToCamelCase } from 'src/utils/under_score-to-camelCase';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'options' })
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    transformer: {
      to: (entityValue: OptionKey) => camelCaseToUnder_score(entityValue),
      from: (databaseValue: string) => under_scoreToCamelCase(databaseValue),
    },
  })
  option_key: OptionKey;

  @Column('text')
  option_value: string;
}
