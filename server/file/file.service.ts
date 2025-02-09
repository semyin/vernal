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
  ) {}

  async uploadFile(file: Express.Multer.File, type: string): Promise<File> {
    const now = Date.now()
    const cosKey = `uploads/${now}_${file.originalname}`;
    const url = await this.cosService.uploadFile(
      cosKey,
      file.buffer
    );

    // 如果 file.filename 是 undefined,手动生成一个文件名
    const filename = file.filename || `${now}_${file.originalname}`;
    
    const newFile = this.fileRepository.create({
      filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      type,
      url,
      cosKey: cosKey,
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
