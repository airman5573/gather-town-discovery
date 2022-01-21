import { BadRequestException } from '@nestjs/common';

export class NotEnoughPointException extends BadRequestException {
  constructor(error?: string) {
    super('포인트가 부족합니다', error);
  }
}
