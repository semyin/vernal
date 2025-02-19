import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MetaService } from './meta.service';
import { Meta } from './meta.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get()
  async findAll(): Promise<Meta[]> {
    return await this.metaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Meta> {
    return await this.metaService.findOne(id);
  }

  @Get('resource/:resourceType/:resourceId')
  async findByResource(
    @Param('resourceType') resourceType: string,
    @Param('resourceId') resourceId: number,
  ): Promise<Meta[]> {
    return await this.metaService.findByResource(resourceType, resourceId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() metaData: Partial<Meta>): Promise<Meta> {
    return await this.metaService.create(metaData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateData: Partial<Meta>): Promise<Meta> {
    return await this.metaService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<void> {
    return await this.metaService.remove(id);
  }
}
