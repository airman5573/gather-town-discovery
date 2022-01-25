import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PUZZLE_PLACE_HOLDER } from 'src/constants';
import { OptionKey, YesOrNo } from 'src/types';
import { shuffle } from 'src/utils/random';
import { Repository } from 'typeorm';
import { OptionDto, PuzzleMessageDto } from './options.dto';
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

  async getOriginalPuzzleMessage(): Promise<string> {
    const puzzleMessageOption = await this.getOption(
      OptionKey.OriginalPuzzleMessage,
    );
    if (!puzzleMessageOption || !puzzleMessageOption.option_value) {
      return '';
    }
    return puzzleMessageOption.option_value;
  }

  async getShuffledPuzzleMessageWithPlaceholder(): Promise<string> {
    const puzzleMessageOption = await this.getOption(
      OptionKey.ShuffledPuzzleMessageWithPlaceHolder,
    );
    if (!puzzleMessageOption || !puzzleMessageOption.option_value) {
      return '';
    }
    return puzzleMessageOption.option_value;
  }

  async updatePuzzleMessage(message: string): Promise<PuzzleMessageDto> {
    const puzzleCount = await this.getPuzzleCount();
    if (puzzleCount < message.length) {
      throw new BadRequestException(
        '암호의 길이가 퍼즐의 개수보다 작을 수 없습니다',
      );
    }
    const noWhiteSpaceMessage = message.replace(/ /g, '');
    const temp = PUZZLE_PLACE_HOLDER.repeat(
      puzzleCount - noWhiteSpaceMessage.length,
    ).concat(noWhiteSpaceMessage);
    const shuffledMessageWithPlaceHolder = JSON.stringify(
      shuffle(temp.split('')),
    );

    await this.updateOption(
      OptionKey.ShuffledPuzzleMessageWithPlaceHolder,
      shuffledMessageWithPlaceHolder,
    );
    const originalPuzzleMessage = await this.updateOption(
      OptionKey.OriginalPuzzleMessage,
      message,
    );
    return {
      originalPuzzleMessage,
      shuffledPuzzleMessageWithPlaceHolder: JSON.parse(
        shuffledMessageWithPlaceHolder,
      ),
    };
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

  async getCompanyImage(): Promise<string> {
    const option = await this.getOption(OptionKey.CompanyImage);
    if (!option || !option.option_value) {
      return 'default.png';
    }
    return option.option_value;
  }

  async updateCompayImage(filename: string): Promise<string> {
    return await this.updateOption(OptionKey.CompanyImage, filename);
  }

  async getMapImage(): Promise<string> {
    const option = await this.getOption(OptionKey.MapImage);
    if (!option || !option.option_value) {
      return 'default.png';
    }
    return option.option_value;
  }

  async updateMapImage(filename: string): Promise<string> {
    return await this.updateOption(OptionKey.MapImage, filename);
  }

  async reset(): Promise<OptionDto> {
    const adminPassword = await this.updateAdminPassword('5911');
    const canSubmitDescryptedSentence =
      await this.updateCanSubmitDecryptedSentence(YesOrNo.NO);
    const puzzleCount = await this.updatePuzzleCount(0);
    const { originalPuzzleMessage } = await this.updatePuzzleMessage('');
    const shuffledPuzzleMessageWithPlaceHolder = [];
    const lastPuzzleVideoUrl = await this.updateLastPuzzleVideoUrl('');
    const canOpenLastPuzzle = await this.updateCanOpenLastPuzzle(YesOrNo.NO);
    const isRunningTimer = await this.updateIsRunningTimer(YesOrNo.NO);
    const companyImage = await this.updateCompayImage('');
    const mapImage = await this.updateMapImage('');

    return {
      adminPassword,
      canSubmitDescryptedSentence,
      puzzleCount,
      originalPuzzleMessage,
      shuffledPuzzleMessageWithPlaceHolder,
      lastPuzzleVideoUrl,
      canOpenLastPuzzle,
      isRunningTimer,
      companyImage,
      mapImage,
    };
  }
}
