import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { OptionsService } from 'src/options/options.service';
import { TeamStatisticsDto } from './statistics.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly optionsService: OptionsService,
  ) {}

  @Roles(ADMIN_ROLE)
  @Get()
  async getStatistics(): Promise<TeamStatisticsDto[]> {
    const statistics = await this.statisticsService.getStatistics();
    const teamCount = (await this.optionsService.getTeamCount()).optionValue;
    return statistics.slice(0, teamCount);
  }
}
