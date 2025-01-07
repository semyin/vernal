import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NoResponseWrapper } from './common/decorators/no-response-wrapper.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @NoResponseWrapper()
  getDatabaseConfig() {
    return this.appService.getDatabaseConfig();
  }
}