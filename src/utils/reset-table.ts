import { TEAMS } from 'src/constants';
import { TeamBaseEntity } from 'src/entities/team.base.entity';
import { Repository } from 'typeorm';

async function resetTable<EntityType extends TeamBaseEntity>(
  repository: Repository<TeamBaseEntity>,
): Promise<EntityType[]> {
  await repository.clear();
  const entites = [];
  for (const team of TEAMS) {
    const entity = repository.create({ team });
    entites.push(entity);
    await repository.save(entity);
  }
  return entites;
}

export default resetTable;
