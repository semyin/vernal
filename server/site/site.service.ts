import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';
import { BaseService } from 'server/common/service/base.service';
import { plainToInstance } from 'class-transformer';
import { MetaService } from '../meta/meta.service';
import { Meta } from '../meta/meta.entity';

export interface SiteWithBaseMeta {
  site: Site
  meta: Meta[]
}

@Injectable()
export class SiteService extends BaseService implements OnModuleInit {
  private site!: Site | null; // 内存中的配置

  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
    private readonly metaService: MetaService, // 注入 MetaService
  ) {
    super(SiteService.name); // 调用基类构造函数，传入当前类名
  }

  // 应用启动时加载配置到内存
  async onModuleInit() {
    await this.loadConfigToMemory();
  }

  // 新增方法：获取站点配置和 Meta 数据
  async getSiteWithBaseMeta(): Promise<SiteWithBaseMeta> {
    const site = this.getSite(); // 获取站点配置
    const meta = this.metaService.getBaseMeta(); // 获取 Meta 数据
    return {
      site,
      meta,
    };
  }

  // 从数据库加载配置到内存
  private async loadConfigToMemory(): Promise<void> {
    this.logger.log('Load site configuration into memory from database...')
    this.site = await this.siteRepository.findOne({ where: { id: 1 } });
    if (!this.site) {
      this.logger.log('No configuration file, creating...')
      // 如果数据库中没有配置，初始化默认配置
      const envVars = ['VITE_SITE_URL', 'VITE_SITE_NAME', 'VITE_SITE_COPYRIGHT', 'VITE_SITE_ICP'];
      // 必要配置做校验
      for (const envVar of envVars) {
        if (!process.env[envVar]) {
          throw new Error(`Environment variable ${envVar} is missing in .env file`);
        }
      }
      const { VITE_SITE_URL, VITE_SITE_NAME, VITE_SITE_DESC, VITE_SITE_COPYRIGHT, VITE_SITE_ICP } = process.env;
      this.site = await this.initConfig({
        name: VITE_SITE_NAME,
        description: VITE_SITE_DESC,
        url: VITE_SITE_URL,
        copyright: VITE_SITE_COPYRIGHT,
        icp: VITE_SITE_ICP,
        runTime: new Date(),
      });
    }
    this.logger.log('Site configuration file loaded successfully!', JSON.stringify(plainToInstance(Site, this.site)))
  }

  // 初始化配置（仅内部调用）
  private async initConfig(siteData: Partial<Site>): Promise<Site> {
    const newConfig = this.siteRepository.create({ ...siteData, id: 1 });
    return this.siteRepository.save(newConfig);
  }

  // 获取内存中的配置
  getSite(): Site {
    if (!this.site) {
      throw new NotFoundException('站点配置未加载');
    }
    return plainToInstance(Site, this.site);
  }

  // 更新配置（同时更新内存和数据库）
  async updateConfig(siteData: Partial<Site>): Promise<Site> {
    if (!this.site) {
      throw new NotFoundException('站点配置未加载');
    }
    // 更新数据库
    await this.siteRepository.update(1, siteData);
    // 更新内存
    this.site = { ...this.site, ...siteData };
    return this.site;
  }
}
