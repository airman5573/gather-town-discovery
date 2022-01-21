import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
