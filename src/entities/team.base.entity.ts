import { IsPositive } from 'class-validator';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TeamBaseEntity extends BaseEntity {
  @PrimaryColumn()
  @IsPositive()
  team: number;
}
