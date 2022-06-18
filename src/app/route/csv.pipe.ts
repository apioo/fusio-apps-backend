import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'csv'
})
export class CsvPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value instanceof Array) {
      return value.join(', ');
    }

    return null;
  }

}
