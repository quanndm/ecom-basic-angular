import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString'
})
export class SliceStringPipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): any {

    return (value !== undefined &&  value.length > 50) ? value.slice(0,47)+" ..." : value;
  }

}
