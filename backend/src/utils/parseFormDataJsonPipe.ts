import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseFormDataJsonPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && typeof value === 'object') {
      for (const key in value) {
        if (typeof value[key] === 'string') {
          try {
            value[key] = JSON.parse(value[key]);
          } catch (err) {
            // Если не JSON — оставляем как есть
          }
        }
      }
    }
    return value;
  }
}
