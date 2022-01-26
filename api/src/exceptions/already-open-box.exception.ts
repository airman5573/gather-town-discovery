import { BadRequestException } from '@nestjs/common';

export class AlreadyOpenBoxException extends BadRequestException {
  constructor(error?: string) {
    super('이미 열린 박스입니다', error);
  }
}
