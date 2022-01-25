import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'mission_uploads' })
export class MissionUploadEntity extends TeamBaseEntity {
  @Column({
    name: 'file_list',
    type: 'simple-array',
  })
  fileList: string[];
}
