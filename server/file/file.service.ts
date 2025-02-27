import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { File } from "./file.entity";
import { CosService } from "./cos.service";
import { Multer } from "multer"

@Injectable()
export class FileService {

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly cosService: CosService
  ) { }

  async uploadFile(file: Express.Multer.File, type: string): Promise<File> {
    // 确保文件名已从 latin1 转换为 utf8
    const originalname = file.originalname;

    const cosKey = `uploads/${Date.now()}_${originalname}`;

    const url = await this.cosService.uploadFile(cosKey, file.buffer);

    const newFile = this.fileRepository.create({
      filename: originalname, // 存储编码后的文件名
      originalname: originalname, // 存储原始文件名（已修复编码）
      mimetype: file.mimetype,
      size: file.size,
      type,
      url,
      cosKey,
    });

    return this.fileRepository.save(newFile);
  }

  async deleteFile(id: number): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException("File not found");
    }

    await this.cosService.deleteFile(file.cosKey);
    await this.fileRepository.delete(id);
  }

  async getFilesByType(type: string): Promise<File[]> {
    return this.fileRepository.find({ where: { type } });
  }
}
