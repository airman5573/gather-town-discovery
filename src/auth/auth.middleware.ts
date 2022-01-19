import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { AccessTokenPayload } from 'src/types';
import { AuthService } from './auth.service';
import { User } from '../types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user: User;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const { password }: AccessTokenPayload = verify(
        accessToken,
        this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      ) as AccessTokenPayload;
      user = await this.authService.validateUser(password);
    } catch (error) {
      throw new ForbiddenException('로그인 먼저 해주세요');
    }

    if (user) {
      req.user = user;
    }

    next();
  }
}
