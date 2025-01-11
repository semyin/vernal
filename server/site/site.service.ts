import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';

@Injectable()
export class SiteService implements OnModuleInit {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
  ) {}

  // 应用启动时自动检查并初始化配置
  async onModuleInit() {
    await this.ensureConfigInitialized();
  }

  // 确保配置已初始化
  async ensureConfigInitialized(): Promise<void> {
    const config = await this.siteRepository.findOne({ where: { id: 1 } });
    if (!config) {
      const { VITE_SITE_URL, VITE_SITE_NAME, VITE_SITE_DESC, VITE_SITE_COPYRIGHT, VITE_SITE_ICP } = process.env
      await this.initConfig({
        name: VITE_SITE_NAME,
        description: VITE_SITE_DESC,
        url: VITE_SITE_URL,
        copyright: VITE_SITE_COPYRIGHT,
        icp: VITE_SITE_ICP,
        runTime: new Date(),
      });
    }
  }

  // 获取配置（只有一条记录，id 固定为 1）
  async getConfig(): Promise<Site> {
    const config = await this.siteRepository.findOne({ where: { id: 1 } });
    if (!config) {
      throw new NotFoundException('站点配置未初始化');
    }
    return config;
  }

  // 初始化配置（只能调用一次）
  async initConfig(siteData: Partial<Site>): Promise<Site> {
    const existingConfig = await this.siteRepository.findOne({ where: { id: 1 } });
    if (existingConfig) {
      throw new Error('站点配置已存在，无法重复初始化');
    }
    const newConfig = this.siteRepository.create({ ...siteData, id: 1 });
    return this.siteRepository.save(newConfig);
  }

  // 更新配置
  async updateConfig(siteData: Partial<Site>): Promise<Site | null> {
    const existingConfig = await this.siteRepository.findOne({ where: { id: 1 } });
    if (!existingConfig) {
      throw new NotFoundException('站点配置未初始化');
    }
    await this.siteRepository.update(1, siteData);
    return this.siteRepository.findOne({ where: { id: 1 } });
  }
}
