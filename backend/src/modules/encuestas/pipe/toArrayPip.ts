import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ToArrayPipe implements PipeTransform {
  transform(value: any) {
    return Array.isArray(value) ? value : [value];
  }
}
