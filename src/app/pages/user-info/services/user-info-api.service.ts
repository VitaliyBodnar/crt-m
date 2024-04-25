import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfoApiService {
  readonly http = inject(HttpClient);

  getUserBalances(userId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/wallets/${userId}/balance/`
    );
  }

  syncUserBalance(userId: number): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/wallets/${userId}/sync_balance/`,
      null
    );
  }
}
