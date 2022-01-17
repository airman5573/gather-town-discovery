import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TeamPassword {
  @PrimaryColumn()
  team: number;

  @Column()
  password: string;
}
