import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OptionsModule } from 'src/options/options.module';
import { TeamPasswordModule } from 'src/team-password/team-password.module';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [TeamPasswordModule, PassportModule, OptionsModule],
  controllers: [AuthController],
  providers: [LocalStrategy, LocalAuthGuard, AuthService, AuthMiddleware],
  exports: [LocalAuthGuard, AuthMiddleware, AuthService],
})
export class AuthModule {}
