import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
