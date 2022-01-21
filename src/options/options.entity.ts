import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Options {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option_key: string;

  @Column('text')
  option_value: string;
}
