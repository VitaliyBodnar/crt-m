import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { VOLUME_STORAGE_KEY } from '@crt/core/constants/local-storage-keys.const';
import { LocalStorageService } from '@crt/core/services/local-storage.service';
import { BehaviorSubject, tap, takeUntil, Observable, forkJoin } from 'rxjs';
import { ISwapTransaction } from '../transactions/interfaces/swap-transaction.interface';
import { TransactionsApiService } from '../transactions/services/transactions-api.service';
import { DestroyDirective } from '@crt/core/pipes/destroy.directive';
import { TransactionsTableComponent } from '@crt/shared/components/transactions-table/transactions-table.component';
import { TransactionsVolumeComponent } from '@crt/shared/components/transactions-volume/transactions-volume.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoApiService } from './services/user-info-api.service';
import { IUserInfoBalances } from './interfaces/user-info-balacndes.interface';
import { NumberFormatterPipe } from '../../core/pipes/numbers-formatter.pipe';
import Swiper from 'swiper';

@Component({
  selector: 'crt-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TransactionsTableComponent,
    TransactionsVolumeComponent,
    NumberFormatterPipe,
  ],
})
export class UserInfoComponent extends DestroyDirective {
  readonly localStorageService = inject(LocalStorageService);
  readonly transactionsApiService = inject(TransactionsApiService);
  readonly usersApiService = inject(UserInfoApiService);

  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  isLoading$ = new BehaviorSubject<boolean>(false);
  transactions: ISwapTransaction[] = [];
  userBalance$ = new BehaviorSubject<number>(null);
  balances: IUserInfoBalances;

  selectedVolume =
    this.localStorageService.getItem<number>(VOLUME_STORAGE_KEY) || 10000;

  ngOnInit(): void {
    this.getUserInfo();
  }

  onVolumeChange(volume: number): void {
    this.selectedVolume = volume;
    this.setTransactionsList();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private getUserInfo(): void {
    this.isLoading$.next(true);
    const id = this.route.snapshot.params.id;

    forkJoin([
      this.usersApiService.syncUserBalance(id),
      this.usersApiService.getUserBalances(id),
      this.getTransactions(),
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([, balances, transactions]) => {
        this.balances = balances;
        this.transactions = transactions;

        this.initSwiper();
        this.userBalance$.next(this.calculateUserBalance(balances));
        this.isLoading$.next(false);
      });
  }

  private setTransactionsList(): void {
    this.isLoading$.next(true);
    this.getTransactions()
      .pipe(
        tap((transactions) => {
          this.transactions = transactions;
          this.isLoading$.next(false);
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  private getTransactions(): Observable<ISwapTransaction[]> {
    return this.transactionsApiService.getTransactions({
      historical_usd__gte: this.selectedVolume,
      limit: 150,
      wallet_id: this.route.snapshot.params.id,
    });
  }

  private calculateUserBalance(balances: IUserInfoBalances): number {
    if (!balances) return 0;
    return balances.chainBalances.reduce((chainBalancesAcc, chain) => {
      return (
        chainBalancesAcc +
        chain.tokenBalances.reduce((tokenBalancesAcc, token) => {
          return tokenBalancesAcc + token.usd;
        }, 0)
      );
    }, 0);
  }

  private initSwiper(): void {
    const swiper = new Swiper('.mySwiper', {
      modules: [],
      spaceBetween: 40,
    });
  }
}
