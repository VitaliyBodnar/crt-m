import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'destroyDirective',
  standalone: true,
})
export class DestroyDirective implements OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
