import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return {
      accessToken: this.authService.createAccessToken(req.user as UserDto),
    };
  }
}
