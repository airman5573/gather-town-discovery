import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Options } from './options.entity';

@Injectable()
export class OptionsService {
  static keys = { adminPassword: 'admin_password' };

  constructor(
    @InjectRepository(Options)
    private optionsRepository: Repository<Options>,
  ) {}

  async updateAdminPassword(password: string): Promise<Options> {
    const adminPasswordOption = await this.optionsRepository.findOne({
      option_key: OptionsService.keys.adminPassword,
    });
    return await this.optionsRepository.save(
      this.optionsRepository.create({
        id: adminPasswordOption?.id,
        option_key: OptionsService.keys.adminPassword,
        option_value: password,
      }),
    );
  }

  async getAdminPassword(): Promise<string> {
    const adminPasswordOption = await this.optionsRepository.findOne({
      option_key: OptionsService.keys.adminPassword,
    });
    return adminPasswordOption.option_value;
  }
}
