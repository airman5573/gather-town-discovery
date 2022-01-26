import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs-extra';
import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';

export const adminMulterOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('지원 하지 않는 이미지 형식입니다'));
    }
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public/uploads/admin';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      const fn = LocalDateTime.now().format(
        DateTimeFormatter.ofPattern('yyyy-MM-dd-HH-mm-ss'),
      );
      callback(null, `${fn}-${file.originalname}`);
    },
  }),
};

export const userMulterOptions = {
  fileFilter: (request, file, callback) => {
    if (
      file.mimetype.match(/\/(jpg|jpeg|png|mp4|avi|wmv|mkv|mov|webm|mp3|)$/)
    ) {
      callback(null, true);
    } else {
      callback(new BadRequestException('지원 하지 않는 파일 형식입니다'));
    }
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public/uploads/user';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      const fn = LocalDateTime.now().format(
        DateTimeFormatter.ofPattern('yyyy-MM-dd-HH-mm-ss'),
      );
      callback(null, `${fn}-${file.originalname}`);
    },
  }),
};
