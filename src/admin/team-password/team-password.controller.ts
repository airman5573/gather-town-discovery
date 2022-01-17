import { Controller } from '@nestjs/common';
import { TeamPasswordService } from './team-password.service';

@Controller()
export class TeamPasswordController {
  constructor(private teamPasswordService: TeamPasswordService) {}
}
