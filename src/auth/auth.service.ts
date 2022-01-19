import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { OptionsService } from 'src/options/options.service';
import { TeamPasswordService } from 'src/team-password/team-password.service';
import { User, UserRole } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly teamPasswordService: TeamPasswordService,
    private readonly optionsService: OptionsService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(password: string): Promise<User | null> {
    const teamPassword = await this.teamPasswordService.findOne(password);
    if (teamPassword) {
      return {
        ...teamPassword,
        role: UserRole.USER,
      };
    }
    const adminPassword = await this.optionsService.getAdminPassword();
    if (password === adminPassword) {
      return { password: adminPassword, role: UserRole.ADMIN };
    }
    return null;
  }

  createAccessToken({ team, password, role }: User): string {
    return sign(
      { team, password, role },
      this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      {
        expiresIn: '1d',
      },
    );
  }
}
