import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTeamPasswordsDto } from './team-password.dto';
import { TeamPassword } from './team-password.entity';

@Injectable()
export class TeamPasswordService {
  constructor(
    @InjectRepository(TeamPassword)
    private teamPasswordRepository: Repository<TeamPassword>,
  ) {}

  async findOne(password: string): Promise<TeamPassword | undefined> {
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
  }

  async getAll(): Promise<TeamPassword[]> {
    return await this.teamPasswordRepository.find();
  }
}
