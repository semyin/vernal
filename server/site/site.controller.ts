import { Controller, Get, Put, Body } from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from './site.entity';
import { Meta } from '../meta/meta.entity';
import { MetaService } from '../meta/meta.service';

interface SiteWithMeta {
  site: Site,
  metas: Meta[]
}

@Controller('site')
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    private readonly metaService: MetaService
  ) {}

  // 获取内存中的站点配置
  @Get()
  getSite(): Site {
    return this.siteService.getSite();
  }

  @Get('config')
  async getSiteConfig(): Promise<SiteWithMeta> {
    const site = this.siteService.getSite()
    const metas = await this.metaService.getBaseMeta()
    return {
      site,
      metas
    }
  }

  // 更新站点配置
  @Put()
  async updateConfig(@Body() siteData: Partial<Site>): Promise<Site> {
    return this.siteService.updateConfig(siteData);
  }
}
