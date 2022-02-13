import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE, USER_ROLE } from 'src/constants';
import { userMulterOptions } from 'src/lib/multer-options';
import { TeamPointService } from 'src/team-point/team-point.service';
import { CheckDto, UploadMissionFileDto } from './mission-upload.dto';
import { MissionUploadEntity } from './mission-upload.entity';
import { MissionUploadService } from './mission-upload.service';

@Controller('mission-upload')
export class MissionUploadController {
  constructor(
    private readonly missionUploadService: MissionUploadService,
    private readonly teamPointService: TeamPointService,
  ) {}

  @Roles(ADMIN_ROLE)
  @Get('all')
  async getAll(): Promise<MissionUploadEntity[]> {
    return await this.missionUploadService.getAllFileList();
  }

  @UseInterceptors(FileInterceptor('mission-file', userMulterOptions))
  @Roles(USER_ROLE)
  @Post()
  async upload(
    @Body() { team, post }: UploadMissionFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MissionUploadEntity> {
    return await this.missionUploadService.addFile(team, post, file.filename);
  }

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<MissionUploadEntity[]> {
    return await this.missionUploadService.reset();
  }

  @Roles(ADMIN_ROLE)
  @Put('check')
  async check(
    @Body() { team, post, point, filename }: CheckDto,
  ): Promise<MissionUploadEntity> {
    return await this.missionUploadService.check({
      team,
      post,
      point,
      filename,
    });
  }
}
