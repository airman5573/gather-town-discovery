import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { OptionsService } from 'src/options/options.service';
import { TeamPasswordService } from 'src/team-password/team-password.service';
import { UserRole } from 'src/types';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly teamPasswordService: TeamPasswordService,
    private readonly optionsService: OptionsService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(password: string): Promise<UserDto | null> {
    if (password === process.env.MASTER_PASSWORD) {
      return { password, role: UserRole.ADMIN };
    }
    const teamPassword = await this.teamPasswordService.findOne(password);
    if (teamPassword) {
      return {
        ...teamPassword,
        role: UserRole.USER,
      };
    }
    const { optionValue: adminPassword } =
      await this.optionsService.getAdminPassword();
    if (password === adminPassword) {
      return { password: adminPassword, role: UserRole.ADMIN };
    }
    return null;
  }

  createAccessToken({ team, password, role }: UserDto): string {
    return sign(
      { team, password, role },
      this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      {
        expiresIn: '1d',
      },
    );
  }
}
