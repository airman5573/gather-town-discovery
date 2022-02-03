import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PUZZLE_PLACE_HOLDER } from 'src/constants';
import { OptionKey, YesOrNo } from 'src/types';
import { shuffle } from 'src/utils/random';
import { Repository } from 'typeorm';
import { OptionDto } from './options.dto';
import { OptionEntity } from './options.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionsRepository: Repository<OptionEntity>,
  ) {}

  async getOptions(): Promise<OptionEntity> {
    const entity = await this.optionsRepository.findOne();
    if (!entity) {
      return await this.reset();
    }
    return entity;
  }

  async getAdminPassword(): Promise<OptionDto> {
    const { adminPassword } = await this.getOptions();
    return OptionDto.create(OptionKey.AdminPassword, adminPassword);
  }

  async updateAdminPassword(password: string): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.adminPassword = password;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.AdminPassword, password);
  }

  async getCanSubmitDescryptedSentence(): Promise<OptionDto> {
    const { canSubmitDescryptedSentence } = await this.getOptions();
    return OptionDto.create(
      OptionKey.AdminPassword,
      canSubmitDescryptedSentence,
    );
  }

  async updateCanSubmitDecryptedSentence(status: YesOrNo): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.canSubmitDescryptedSentence = status;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.CanSubmitDescryptedSentence, status);
  }

  async getPuzzleCount(): Promise<OptionDto> {
    const { puzzleCount } = await this.getOptions();
    return OptionDto.create(OptionKey.PuzzleCount, puzzleCount);
  }

  async updatePuzzleCount(count: number): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.puzzleCount = count;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.PuzzleCount, count);
  }

  async getOriginalPuzzleMessage(): Promise<OptionDto> {
    const { originalPuzzleMessage } = await this.getOptions();
    return OptionDto.create(
      OptionKey.OriginalPuzzleMessage,
      originalPuzzleMessage,
    );
  }

  async getShuffledPuzzleMessageWithPlaceholder(): Promise<OptionDto> {
    const { shuffledPuzzleMessageWithPlaceholder } = await this.getOptions();
    return OptionDto.create(
      OptionKey.ShuffledPuzzleMessageWithPlaceHolder,
      shuffledPuzzleMessageWithPlaceholder,
    );
  }

  async updatePuzzleMessage(message: string): Promise<OptionDto> {
    const { optionValue: puzzleCount } = await this.getPuzzleCount();
    if (puzzleCount < message.length) {
      throw new BadRequestException(
        '암호의 길이가 퍼즐의 개수보다 작을 수 없습니다',
      );
    }
    const noWhiteSpaceMessage = message.replace(/ /g, '');
    const temp = PUZZLE_PLACE_HOLDER.repeat(
      puzzleCount - noWhiteSpaceMessage.length,
    ).concat(noWhiteSpaceMessage);
    const shuffledMessageWithPlaceHolder = shuffle(temp.split(''));

    const entity = await this.getOptions();
    entity.originalPuzzleMessage = message;
    entity.shuffledPuzzleMessageWithPlaceholder =
      shuffledMessageWithPlaceHolder;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.OriginalPuzzleMessage, message);
  }

  async getLastPuzzleVideoUrl(): Promise<OptionDto> {
    const { lastPuzzleVideoUrl } = await this.getOptions();
    return OptionDto.create(OptionKey.LastPuzzleVideoUrl, lastPuzzleVideoUrl);
  }

  async updateLastPuzzleVideoUrl(videoUrl: string): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.lastPuzzleVideoUrl = videoUrl;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.LastPuzzleVideoUrl, videoUrl);
  }

  async getCanOpenLastPuzzle(): Promise<OptionDto> {
    const { canOpenLastPuzzle } = await this.getOptions();
    return OptionDto.create(OptionKey.CanOpenLastPuzzle, canOpenLastPuzzle);
  }

  async updateCanOpenLastPuzzle(status: YesOrNo): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.canOpenLastPuzzle = status;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.CanOpenLastPuzzle, status);
  }

  async getIsRunningTimer(): Promise<OptionDto> {
    const { isRunningTimer } = await this.getOptions();
    return OptionDto.create(OptionKey.IsRunningTimer, isRunningTimer);
  }

  async updateIsRunningTimer(status: YesOrNo): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.isRunningTimer = status;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.IsRunningTimer, status);
  }

  async getLapTime(): Promise<OptionDto> {
    const { lapTime } = await this.getOptions();
    return OptionDto.create(OptionKey.LapTime, lapTime);
  }

  async updateLapTime(timeInSeconds: number): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.lapTime = timeInSeconds;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.LapTime, timeInSeconds);
  }

  async getCompanyImage(): Promise<OptionDto> {
    const { companyImage } = await this.getOptions();
    return OptionDto.create(OptionKey.CompanyImage, companyImage);
  }

  async updateCompayImage(filename: string): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.companyImage = filename;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.CompanyImage, filename);
  }

  async getMapImage(): Promise<OptionDto> {
    const { mapImage } = await this.getOptions();
    return OptionDto.create(OptionKey.MapImage, mapImage);
  }

  async updateMapImage(filename: string): Promise<OptionDto> {
    const entity = await this.getOptions();
    entity.mapImage = filename;
    await this.optionsRepository.save(entity);
    return OptionDto.create(OptionKey.MapImage, filename);
  }

  async reset(): Promise<OptionEntity> {
    const entity =
      (await this.optionsRepository.findOne()) || new OptionEntity();
    entity.adminPassword = '5911';
    entity.canSubmitDescryptedSentence = YesOrNo.NO;
    entity.puzzleCount = 0;
    entity.originalPuzzleMessage = '';
    entity.shuffledPuzzleMessageWithPlaceholder = [];
    entity.lastPuzzleVideoUrl = '';
    entity.canOpenLastPuzzle = YesOrNo.NO;
    entity.isRunningTimer = YesOrNo.NO;
    entity.companyImage = '';
    entity.mapImage = '';
    this.optionsRepository.save(entity);

    return entity;
  }
}
