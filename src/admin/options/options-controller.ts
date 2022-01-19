import { Controller, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Roles('admin')
  @Put('admin-password/:pw')
  async updateAdminPassword(@Param('pw') pw: string) {
    return await this.optionsService.updateAdminPassword(pw);
  }

  @Roles('admin')
  @Get('admin-password')
  async getAdminPassword() {
    return await this.optionsService.getAdminPassword();
  }
}
