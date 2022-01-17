import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeamPasswordService } from 'src/admin/team-password/team-password.service';
import { LoginResponse, User, UserRole } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private teamPasswordService: TeamPasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(password: string): Promise<User | null> {
    const teamPassword = await this.teamPasswordService.findOne(password);
    if (teamPassword) {
      return {
        ...teamPassword,
        role: UserRole.USER,
      };
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { team: user.team, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
