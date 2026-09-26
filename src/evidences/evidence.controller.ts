import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EvidenceResponseDto } from './dto/evidence-response.dto';

  @Post('/evidence')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (_req, file, cb) => cb(null, file.originalname),
      }),
    })
    )
    return filename;
  )
