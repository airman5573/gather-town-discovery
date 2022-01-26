import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { TeamStatisticsDto } from './statistics.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Roles(ADMIN_ROLE)
  @Get()
  async getStatistics(): Promise<TeamStatisticsDto[]> {
    return await this.statisticsService.getStatistics();
  }
}
