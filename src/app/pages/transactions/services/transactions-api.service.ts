import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ISwapTransaction } from '../interfaces/swap-transaction.interface';
import { ToastrService } from 'ngx-toastr';
import { ISwapTransactionPayload } from '../interfaces/swap-transaction-payload.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApiService {
  readonly http = inject(HttpClient);
  readonly toastrService = inject(ToastrService);

  getTransactions(
    payload: ISwapTransactionPayload
  ): Observable<ISwapTransaction[]> {
    const params = new HttpParams({
      fromObject: { ...payload },
    });

    return this.http
      .get<{ results: ISwapTransaction[] }>(`${environment.apiUrl}/swaps/`, {
        params,
      })
      .pipe(map(({ results }) => results));
  }
}
