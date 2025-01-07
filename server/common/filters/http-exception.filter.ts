import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from '../interfaces/response.interface';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      let code = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = '服务器内部错误';
  
      if (exception instanceof HttpException) {
        code = exception.getStatus();
        message = exception.message;
      }
  
      response.status(code).json({
        code,
        message,
        data: null,
      });
    }
  }