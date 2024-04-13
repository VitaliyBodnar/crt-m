import { Pipe } from '@angular/core';

@Pipe({
  name: 'fixed',
  standalone: true,
})
export class FixedPipe {
  transform(input: string | number) {
    return (+input).toFixed(3);
  }
}
