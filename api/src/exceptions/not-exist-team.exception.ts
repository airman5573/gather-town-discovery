import { BadRequestException } from '@nestjs/common';

export class NotExistTeamException extends BadRequestException {
  constructor(error?: string) {
    super('해당 팀은 존재하지 않습니다', error);
  }
}
