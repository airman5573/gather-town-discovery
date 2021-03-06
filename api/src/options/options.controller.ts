import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import {
  UpdateAdminPasswordDto,
  UpdateLastPuzzleVideoUrlDto,
  UpdatePuzzleCountDto,
  UpdatePuzzleMessageDto,
  UpdateCanSubmitDescryptedSentenceDto,
  UpdateCanOpenLastPuzzleDto,
  UpdateIsRunningTimerDto,
  OptionDto,
  UpdateLapTimeDto,
  UpdateTeamCountDto,
} from './options.dto';
import { OptionsService } from './options.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { adminMulterOptions } from 'src/lib/multer-options';
import { OptionEntity } from './options.entity';

@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Roles(ADMIN_ROLE)
  @Get('team-count')
  async getTeamCount(): Promise<OptionDto> {
    return this.optionsService.getTeamCount();
  }

  @Roles(ADMIN_ROLE)
  @Put('team-count')
  async updateTeamCount(
    @Body() { teamCount }: UpdateTeamCountDto,
  ): Promise<OptionDto> {
    return this.optionsService.updateTeamCount(teamCount);
  }

  @Roles(ADMIN_ROLE)
  @Get()
  async getAllOptions(): Promise<OptionEntity> {
    const options = await this.optionsService.getOptions();
    delete options.id;
    return options;
  }

  @Roles(ADMIN_ROLE)
  @Get('admin-password')
  async getAdminPassword(): Promise<OptionDto> {
    return await this.optionsService.getAdminPassword();
  }

  @Roles(ADMIN_ROLE)
  @Put('admin-password')
  async updateAdminPassword(
    @Body() updateAdminPasswordDto: UpdateAdminPasswordDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updateAdminPassword(
      updateAdminPasswordDto.password,
    );
  }

  @Get('can-submit-descrypted-sentence')
  async getCanSubmitDescryptedSentence(): Promise<OptionDto> {
    return await this.optionsService.getCanSubmitDescryptedSentence();
  }

  @Roles(ADMIN_ROLE)
  @Put('can-submit-descrypted-sentence')
  async updateCanSubmitDescryptedSentence(
    @Body()
    updateCanSubmitDescryptedSentenceDto: UpdateCanSubmitDescryptedSentenceDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updateCanSubmitDecryptedSentence(
      updateCanSubmitDescryptedSentenceDto.status,
    );
  }

  @Get('puzzle-count')
  async getPuzzleCount(): Promise<OptionDto> {
    return await this.optionsService.getPuzzleCount();
  }

  @Roles(ADMIN_ROLE)
  @Put('puzzle-count')
  async updatePuzzleCount(
    @Body() updatePuzzleCountDto: UpdatePuzzleCountDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updatePuzzleCount(
      updatePuzzleCountDto.puzzleCount,
    );
  }

  @Roles(ADMIN_ROLE)
  @Get('original-puzzle-message')
  async getOriginalPuzzleMessage(): Promise<OptionDto> {
    return await this.optionsService.getOriginalPuzzleMessage();
  }

  @Get('shuffled-puzzle-message-with-placeholder')
  async getShuffledPuzzleMessageWithPlaceholder(): Promise<OptionDto> {
    return await this.optionsService.getShuffledPuzzleMessageWithPlaceholder();
  }

  @Roles(ADMIN_ROLE)
  @Put('puzzle-message')
  async updatePuzzleMessage(
    @Body() updatePuzzleMessageDto: UpdatePuzzleMessageDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updatePuzzleMessage(
      updatePuzzleMessageDto.message,
    );
  }

  @Get('last-puzzle-video-url')
  async getLastPuzzleVideoUrl(): Promise<OptionDto> {
    return await this.optionsService.getLastPuzzleVideoUrl();
  }

  @Roles(ADMIN_ROLE)
  @Put('last-puzzle-video-url')
  async updateLastPuzzleVideoUrl(
    @Body() updateLastPuzzleVideoUrlDto: UpdateLastPuzzleVideoUrlDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updateLastPuzzleVideoUrl(
      updateLastPuzzleVideoUrlDto.videoUrl,
    );
  }

  @Get('can-open-last-puzzle')
  async getCanOpenLastPuzzle(): Promise<OptionDto> {
    return await this.optionsService.getCanOpenLastPuzzle();
  }

  @Roles(ADMIN_ROLE)
  @Put('can-open-last-puzzle')
  async updateCanOpenLastPuzzle(
    @Body() updateCanOpenLastPuzzleDto: UpdateCanOpenLastPuzzleDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updateCanOpenLastPuzzle(
      updateCanOpenLastPuzzleDto.status,
    );
  }

  @Get('lap-time')
  async getLapTime(): Promise<OptionDto> {
    return await this.optionsService.getLapTime();
  }

  @Roles(ADMIN_ROLE)
  @Put('lap-time')
  async updateLapTime(
    @Body() updateLapTimeDto: UpdateLapTimeDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updateLapTime(updateLapTimeDto.lapTime);
  }

  @Get('is-running-timer')
  async getIsRunningTimer(): Promise<OptionDto> {
    return await this.optionsService.getIsRunningTimer();
  }

  @Roles(ADMIN_ROLE)
  @Put('is-running-timer')
  async updateIsRunningTimer(
    @Body() updateIsRunningTimerDto: UpdateIsRunningTimerDto,
  ): Promise<OptionDto> {
    return await this.optionsService.updateIsRunningTimer(
      updateIsRunningTimerDto.status,
    );
  }

  @Get('company-image')
  async getCompanyImage(): Promise<OptionDto> {
    return await this.optionsService.getCompanyImage();
  }

  @Get('map-image')
  async getMapImage(): Promise<OptionDto> {
    return await this.optionsService.getMapImage();
  }

  // 'company-image' => formData??? key???
  // null => ?????? ?????? ??????
  @UseInterceptors(FileInterceptor('image', adminMulterOptions))
  @Roles(ADMIN_ROLE)
  @Post('company-image')
  async uploadCompayImage(@UploadedFile() file) {
    await this.optionsService.updateCompayImage(file.filename);
    return {
      imgPath: `${process.env.SERVER_URL}/${process.env.ADMIN_UPLOAD_PATH}/${file.filename}`,
    };
  }

  @UseInterceptors(FileInterceptor('image', adminMulterOptions))
  @Roles(ADMIN_ROLE)
  @Post('map-image')
  async uploadMapImage(@UploadedFile() file) {
    await this.optionsService.updateMapImage(file.filename);
    return {
      imgPath: `${process.env.SERVER_URL}/${process.env.ADMIN_UPLOAD_PATH}/${file.filename}`,
    };
  }
}
