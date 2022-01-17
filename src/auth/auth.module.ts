import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TeamPasswordModule } from 'src/admin/team-password/team-password.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [TeamPasswordModule, PassportModule],
  controllers: [AuthController],
  providers: [LocalStrategy, LocalAuthGuard, AuthService],
})
export class AuthModule {}
