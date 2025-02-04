import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseOptionalArrayPipe implements PipeTransform<string, number[] | undefined> {
  transform(value: string): number[] | undefined {
    if (!value) {
      return undefined;
    }
    try {
      // 如果输入是 [1,2,3] 格式，去掉方括号
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
      }
      // 将逗号分隔的字符串解析为数字数组
      return value.split(',').map(Number);
    } catch (error) {
      throw new BadRequestException('Invalid array format');
    }
  }
}
