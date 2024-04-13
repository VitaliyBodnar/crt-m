import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionsTokenName',
  standalone: true,
})
export class TransactionsTokenNamePipe implements PipeTransform {
  transform(tokenId: number | string): unknown {
    return `https://static.arkhamintelligence.com/tokens/${tokenId}.png`;
  }
}
