import { BadRequestException } from '@nestjs/common';

export class BoxAlreadyOpenException extends BadRequestException {
  constructor(error?: string) {
    super('이미 열린 박스입니다', error);
  }
}
