import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      host: this.configService.get<string>('DATABASE_HOST', 'localhost'), // 如果未定义，使用 'localhost'
      port: this.configService.get<number>('DATABASE_PORT', 3306), // 如果未定义，使用 3306
    };
  }
}