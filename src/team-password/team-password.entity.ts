import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TeamPasswordEntity {
  @PrimaryColumn()
  team: number;

  @Column()
  password: string;
}
