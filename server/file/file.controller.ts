import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Delete,
  Get,
  Query,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { File } from "./file.entity";
import { Multer } from "multer";

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
      },
      fileFilter: (req, file, cb) => {
        // 修复文件名编码（内存操作，占用极低）
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, true);
      },
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body("type") type: string
  ): Promise<File> {
    return this.fileService.uploadFile(file, type);
  }

  @Delete(":id")
  async deleteFile(@Param("id") id: number): Promise<void> {
    return this.fileService.deleteFile(id);
  }

  @Get()
  async getFilesByType(@Query("type") type: string): Promise<File[]> {
    return this.fileService.getFilesByType(type);
  }
}
