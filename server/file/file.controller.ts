import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Delete,
  Get,
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { File } from "./file.entity";
import type { Express } from "express";

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // @Query("type") type: string
  ): Promise<null> {
    console.log(file);

    return null;
    // return this.fileService.uploadFile(file, type);
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
