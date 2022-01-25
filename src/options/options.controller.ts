import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { adminMulterOptions } from 'src/lib/multer-options';

@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Roles(ADMIN_ROLE)
  @Get('admin-password')
  async getAdminPassword(): Promise<string> {
    return await this.optionsService.getAdminPassword();
  }

  @Roles(ADMIN_ROLE)
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

  @Roles(ADMIN_ROLE)
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

  @Roles(ADMIN_ROLE)
  @Put('puzzle-count')
  async updatePuzzleCount(@Body() updatePuzzleCountDto: UpdatePuzzleCountDto) {
    return await this.optionsService.updatePuzzleCount(
      updatePuzzleCountDto.puzzleCount,
    );
  }

  @Roles(ADMIN_ROLE)
  @Get('original-puzzle-message')
  async getOriginalPuzzleMessage(): Promise<string> {
    return await this.optionsService.getOriginalPuzzleMessage();
  }

  @Get('shuffled-puzzle-message-with-placeholder')
  async getShuffledPuzzleMessageWithPlaceholder(): Promise<string> {
    return await this.optionsService.getShuffledPuzzleMessageWithPlaceholder();
  }

  @Roles(ADMIN_ROLE)
  @Put('puzzle-message')
  async updatePuzzleMessage(
    @Body() updatePuzzleMessageDto: UpdatePuzzleMessageDto,
  ): Promise<string> {
    return await this.optionsService.updatePuzzleMessage(
      updatePuzzleMessageDto.message,
    );
  }

  @Get('last-puzzle-video-url')
  async getLastPuzzleVideoUrl(): Promise<string> {
    return await this.optionsService.getLastPuzzleVideoUrl();
  }

  @Roles(ADMIN_ROLE)
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

  @Roles(ADMIN_ROLE)
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

  @Roles(ADMIN_ROLE)
  @Put('is-running-timer')
  async updateIsRunningTimer(
    @Body() updateIsRunningTimerDto: UpdateIsRunningTimerDto,
  ): Promise<YesOrNo> {
    return await this.optionsService.updateIsRunningTimer(
      updateIsRunningTimerDto.status,
    );
  }

  // 'company-image' => formData의 key값
  // null => 파일 최대 갯수
  @UseInterceptors(FileInterceptor('image', adminMulterOptions))
  @Roles(ADMIN_ROLE)
  @Post('company-image')
  async uploadCompayImage(@UploadedFile() file) {
    await this.optionsService.updateCompayImage(file.filename);
    return `${process.env.SERVER_URL}/${process.env.ADMIN_UPLOAD_PATH}/${file.filename}`;
  }

  @UseInterceptors(FileInterceptor('image', adminMulterOptions))
  @Roles(ADMIN_ROLE)
  @Post('map-image')
  async uploadMapImage(@UploadedFile() file) {
    await this.optionsService.updateMapImage(file.filename);
    return `${process.env.SERVER_URL}/${process.env.ADMIN_UPLOAD_PATH}/${file.filename}`;
  }
}
