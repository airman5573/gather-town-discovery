import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'options' })
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option_key: string;

  @Column('text')
  option_value: string;
}
