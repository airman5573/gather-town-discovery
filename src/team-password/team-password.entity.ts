import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'team_passwords' })
export class TeamPasswordEntity extends TeamBaseEntity {
  @Column({ default: 0 })
  password: string;
}
