import { Injectable } from '@nestjs/common';
import { TeamPasswordService } from 'src/admin/team-password/team-password.service';
import { User, UserRole } from 'src/types';

@Injectable()
export class AuthService {
  constructor(private teamPasswordService: TeamPasswordService) {}

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
}
