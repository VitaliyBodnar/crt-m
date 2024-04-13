import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter',
  standalone: true,
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return '';
    }

    const absValue = Math.abs(value);
    let newValue: string = Math.abs(value).toString();

    if (absValue >= 1e12) {
      newValue = (absValue / 1e12).toFixed(2) + 'T';
    } else if (absValue >= 1e9) {
      newValue = (absValue / 1e9).toFixed(2) + 'B';
    } else if (absValue >= 1e6) {
      newValue = (absValue / 1e6).toFixed(2) + 'M';
    } else if (absValue >= 1e3) {
      newValue = (absValue / 1e3).toFixed(2) + 'K';
    } else {
      newValue = absValue.toFixed(2);
    }

    return newValue;
  }
}
