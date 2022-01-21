import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionKey, YesOrNo } from 'src/types';
import { Repository } from 'typeorm';
import { OptionEntity } from './options.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionsRepository: Repository<OptionEntity>,
  ) {}

  async getOption(key: OptionKey): Promise<OptionEntity> {
    return await this.optionsRepository.findOne({
      option_key: key,
    });
  }

  async updateOption(key: OptionKey, value: string): Promise<string> {
    const option = await this.getOption(key);
    await this.optionsRepository.save(
      this.optionsRepository.create({
        id: option?.id,
        option_key: key,
        option_value: value,
      }),
    );
    return value;
  }

  async getAdminPassword(): Promise<string> {
    const option = await this.getOption(OptionKey.AdminPassword);
    if (!option || !option.option_value) {
      return process.env.MASTER_PASSWORD;
    }
    return option.option_value;
  }

  async updateAdminPassword(password: string): Promise<string> {
    return await this.updateOption(OptionKey.AdminPassword, password);
  }

  async getCanSubmitDescryptedSentence(): Promise<YesOrNo> {
    const option = await this.getOption(OptionKey.CanSubmitDescryptedSentence);
    if (!option || !option.option_value) {
      return YesOrNo.NO;
    }
    return option.option_value as YesOrNo;
  }

  async updateCanSubmitDecryptedSentence(status: YesOrNo): Promise<YesOrNo> {
    return (await this.updateOption(
      OptionKey.CanSubmitDescryptedSentence,
      status,
    )) as YesOrNo;
  }

  async getPuzzleCount(): Promise<number> {
    const puzzleCountOption = await this.getOption(OptionKey.PuzzleCount);
    if (!puzzleCountOption || !puzzleCountOption.option_value) {
      return 0;
    }
    return parseInt(puzzleCountOption.option_value, 10);
  }

  async updatePuzzleCount(count: number): Promise<number> {
    const result = await this.updateOption(OptionKey.PuzzleCount, `${count}`);
    return parseInt(result, 10);
  }

  async getPuzzleMessage(): Promise<string> {
    const puzzleMessageOption = await this.getOption(OptionKey.PuzzleMessage);
    if (!puzzleMessageOption || !puzzleMessageOption.option_value) {
      return '';
    }
    return puzzleMessageOption.option_value;
  }

  async updatePuzzleMessage(message: string): Promise<string> {
    return await this.updateOption(OptionKey.PuzzleMessage, message);
  }

  async getLastPuzzleVideoUrl(): Promise<string> {
    const option = await this.getOption(OptionKey.LastPuzzleVideoUrl);
    if (!option || !option.option_value) {
      return '';
    }
    return option.option_value;
  }

  async updateLastPuzzleVideoUrl(videoUrl: string): Promise<string> {
    return await this.updateOption(OptionKey.LastPuzzleVideoUrl, videoUrl);
  }

  async getCanOpenLastPuzzle(): Promise<YesOrNo> {
    const option = await this.getOption(OptionKey.CanOpenLastPuzzle);
    if (!option || !option.option_value) {
      return YesOrNo.NO;
    }
    return option.option_value as YesOrNo;
  }

  async updateCanOpenLastPuzzle(status: YesOrNo): Promise<YesOrNo> {
    return (await this.updateOption(
      OptionKey.CanOpenLastPuzzle,
      status,
    )) as YesOrNo;
  }

  async getIsRunningTimer(): Promise<YesOrNo> {
    const option = await this.getOption(OptionKey.IsRunningTimer);
    if (!option || !option.option_value) {
      return YesOrNo.NO;
    }
    return option.option_value as YesOrNo;
  }

  async updateIsRunningTimer(status: YesOrNo): Promise<YesOrNo> {
    return (await this.updateOption(
      OptionKey.IsRunningTimer,
      status,
    )) as YesOrNo;
  }
}
