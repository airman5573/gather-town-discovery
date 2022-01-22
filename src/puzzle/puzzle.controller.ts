import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { OpenPuzzleDto } from './puzzle.dto';
import { PuzzleEntity } from './puzzle.entity';
import { PuzzleService } from './puzzle.service';

@Controller('puzzle')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Get('all')
  async getAllPuzzles(): Promise<PuzzleEntity[]> {
    return await this.puzzleService.findAll();
  }

  @Get(':team')
  async getPuzzle(@Param('team') team: number): Promise<PuzzleEntity> {
    return await this.puzzleService.findOne(team);
  }

  @Roles('user', 'admin')
  @Post('open')
  async openPuzzle(
    @Body() { team, boxNum }: OpenPuzzleDto,
  ): Promise<PuzzleEntity[]> {
    return await this.puzzleService.add(team, boxNum);
  }

  @Roles('admin')
  @Put('reset')
  async reset(): Promise<PuzzleEntity[]> {
    return await this.puzzleService.reset();
  }
}
