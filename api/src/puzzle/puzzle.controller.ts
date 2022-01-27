import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { ADMIN_ROLE, USER_ROLE } from 'src/constants';
import { OpenPuzzleDto } from './puzzle.dto';
import { PuzzleEntity } from './puzzle.entity';
import { PuzzleService } from './puzzle.service';

@Controller('puzzle')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Get('all')
  async getAllOpenedBoxList(): Promise<PuzzleEntity[]> {
    return await this.puzzleService.getAllOpendBoxList();
  }

  @Get(':team')
  async getOpenedBoxList(@Param('team') team: number): Promise<PuzzleEntity> {
    return await this.puzzleService.getOpenedBoxList(team);
  }

  @Roles(USER_ROLE)
  @Post('open')
  async openPuzzle(
    @Body() { boxNum }: OpenPuzzleDto,
    @AuthUser('team') team: number,
  ): Promise<PuzzleEntity[]> {
    return await this.puzzleService.add(team, boxNum);
  }

  @Roles(ADMIN_ROLE)
  @Put('reset')
  async reset(): Promise<PuzzleEntity[]> {
    return await this.puzzleService.reset();
  }
}
