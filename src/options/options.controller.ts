import { Body, Controller, Get, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { YesOrNo } from 'src/types';
import {
  UpdateAdminPasswordDto,
  UpdateLastPuzzleVideoUrlDto,
  UpdatePuzzleCountDto,
  UpdatePuzzleMessageDto,
  UpdateCanSubmitDescryptedSentenceDto,
  UpdateCanOpenLastPuzzleDto,
  UpdateIsRunningTimerDto,
} from './options.dto';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Roles('admin')
  @Get('admin-password')
  async getAdminPassword(): Promise<string> {
    return await this.optionsService.getAdminPassword();
  }

  @Roles('admin')
  @Put('admin-password')
  async updateAdminPassword(
    @Body() updateAdminPasswordDto: UpdateAdminPasswordDto,
  ): Promise<string> {
    return await this.optionsService.updateAdminPassword(
      updateAdminPasswordDto.password,
    );
  }

  @Get('can-submit-descrypted-sentence')
  async getCanSubmitDescryptedSentence(): Promise<YesOrNo> {
    return await this.optionsService.getCanSubmitDescryptedSentence();
  }

  @Roles('admin')
  @Put('can-submit-descrypted-sentence')
  async updateCanSubmitDescryptedSentence(
    @Body()
    updateCanSubmitDescryptedSentenceDto: UpdateCanSubmitDescryptedSentenceDto,
  ): Promise<YesOrNo> {
    return await this.optionsService.updateCanSubmitDecryptedSentence(
      updateCanSubmitDescryptedSentenceDto.status,
    );
  }

  @Get('puzzle-count')
  async getPuzzleCount(): Promise<number> {
    return await this.optionsService.getPuzzleCount();
  }

  @Roles('admin')
  @Put('puzzle-count')
  async updatePuzzleCount(@Body() updatePuzzleCountDto: UpdatePuzzleCountDto) {
    return await this.optionsService.updatePuzzleCount(
      updatePuzzleCountDto.puzzleCount,
    );
  }

  @Get('puzzle-message')
  async getPuzzleMessage(): Promise<string> {
    return await this.optionsService.getPuzzleMessage();
  }

  @Roles('admin')
  @Put('puzzle-message')
  async updatePuzzleMessage(
    @Body() updatePuzzleMessageDto: UpdatePuzzleMessageDto,
  ): Promise<string> {
    console.log('updatePuzzleMessageDto : ', updatePuzzleMessageDto);
    return await this.optionsService.updatePuzzleMessage(
      updatePuzzleMessageDto.message,
    );
  }

  @Get('last-puzzle-video-url')
  async getLastPuzzleVideoUrl(): Promise<string> {
    return await this.optionsService.getLastPuzzleVideoUrl();
  }

  @Roles('admin')
  @Put('last-puzzle-video-url')
  async updateLastPuzzleVideoUrl(
    @Body() updateLastPuzzleVideoUrlDto: UpdateLastPuzzleVideoUrlDto,
  ): Promise<string> {
    return await this.optionsService.updateLastPuzzleVideoUrl(
      updateLastPuzzleVideoUrlDto.videoUrl,
    );
  }

  @Get('can-open-last-puzzle')
  async getCanOpenLastPuzzle(): Promise<YesOrNo> {
    return await this.optionsService.getCanOpenLastPuzzle();
  }

  @Roles('admin')
  @Put('can-open-last-puzzle')
  async updateCanOpenLastPuzzle(
    @Body() updateCanOpenLastPuzzleDto: UpdateCanOpenLastPuzzleDto,
  ): Promise<YesOrNo> {
    return await this.optionsService.updateCanOpenLastPuzzle(
      updateCanOpenLastPuzzleDto.status,
    );
  }

  @Get('is-running-timer')
  async getIsRunningTimer(): Promise<YesOrNo> {
    return await this.optionsService.getIsRunningTimer();
  }

  @Roles('admin')
  @Put('is-running-timer')
  async updateIsRunningTimer(
    @Body() updateIsRunningTimerDto: UpdateIsRunningTimerDto,
  ): Promise<YesOrNo> {
    return await this.optionsService.updateIsRunningTimer(
      updateIsRunningTimerDto.status,
    );
  }
}
