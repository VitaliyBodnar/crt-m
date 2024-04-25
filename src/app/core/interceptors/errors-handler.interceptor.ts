import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const errorsHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    tap(
      (event) => (event instanceof HttpResponse ? 'succeeded' : ''),
      (err) => {
        toastrService.error(err.message);
      },
    ),
  );
};
