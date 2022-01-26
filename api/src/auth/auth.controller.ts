import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/types';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return {
      accessToken: this.authService.createAccessToken(req.user as User),
    };
  }
}
