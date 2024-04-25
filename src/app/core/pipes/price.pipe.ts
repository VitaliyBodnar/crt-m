import { Pipe } from '@angular/core';

@Pipe({
  name: 'mathAbs',
  standalone: true,
})
export class MathAbsPipe {
  transform(a: number): number {
    return Math.abs(a);
  }
}
