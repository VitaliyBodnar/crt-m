import { Pipe } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true,
})
export class RoundPipe {
  transform(value: number): number {
    return Math.round(value * 1e12) / 1e12;
  }
}
