import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cryptoCurrency',
  standalone: true,
})
export class CryptoCurrencyPipe implements PipeTransform {
  transform(value: number, decimals = 8, symbol = 'Ξ'): string {
    if (isNaN(value)) return '';

    const absValue = Math.abs(value);
    const numSignificantDigits =
      absValue >= 0.00001 ? Math.floor(Math.log10(absValue)) + 1 : 1; // Minimum 1 significant digit

    return `<span class="math-inline">\{symbol\}</span>{value.toFixed(Math.max(numSignificantDigits, decimals))}`;
  }
}
