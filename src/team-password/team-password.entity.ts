import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'team_passwords' })
export class TeamPasswordEntity {
  @PrimaryColumn()
  team: number;

  @Column()
  password: string;
}
