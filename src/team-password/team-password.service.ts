import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAMS } from 'src/constants';
import { Repository } from 'typeorm';
import { UpdateTeamPasswordsDto } from './team-password.dto';
import { TeamPasswordEntity } from './team-password.entity';

@Injectable()
export class TeamPasswordService {
  constructor(
    @InjectRepository(TeamPasswordEntity)
    private teamPasswordRepository: Repository<TeamPasswordEntity>,
  ) {}

  async findOne(password: string): Promise<TeamPasswordEntity | undefined> {
    return await this.teamPasswordRepository.findOne({ password });
  }

  async update({ teamPasswords }: UpdateTeamPasswordsDto) {
    for (const { team, password } of teamPasswords) {
      await this.teamPasswordRepository.update(
        {
          team,
        },
        this.teamPasswordRepository.create({
          team,
          password,
        }),
      );
    }
    return teamPasswords;
  }

  async getAll(): Promise<TeamPasswordEntity[]> {
    return await this.teamPasswordRepository.find();
  }

  async reset(): Promise<TeamPasswordEntity[]> {
    await this.teamPasswordRepository.clear();
    const entites = [];
    for (const team of TEAMS) {
      const entity = this.teamPasswordRepository.create({
        team,
        password: `${team}`,
      });
      entites.push(entity);
      await this.teamPasswordRepository.save(entity);
    }
    return entites;
  }
}
