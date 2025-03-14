import { Controller, Get } from '@nestjs/common';
import { SetResponse } from './common/decorators/set-response.decorator';

@Controller()
export class AppController {

  @Get()
  @SetResponse(200, 'status ok!')
  public warmup() {}

}