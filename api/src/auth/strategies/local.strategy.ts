import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'password', passwordField: 'password' });
  }

  async validate(password: string): Promise<any> {
    const user = await this.authService.validateUser(password);
    if (!user) {
      throw new UnauthorizedException('비밀번호를 다시 확인해주세요');
    }
    return user;
  }
}
