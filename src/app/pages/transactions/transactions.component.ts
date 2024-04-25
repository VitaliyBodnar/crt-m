import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize, takeUntil, tap } from 'rxjs';

import { TransactionsApiService } from './services/transactions-api.service';
import { DestroyDirective } from '../../core/pipes/destroy.directive';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

import { TransactionsGroupsListComponent } from '../../shared/components/transactions-groups-list/transactions-groups-list.component';
import { TransactionsTableComponent } from '../../shared/components/transactions-table/transactions-table.component';
import { ISwapTransaction } from './interfaces/swap-transaction.interface';
import { ISwapTransactionsGroup } from './interfaces/swap-transations-group.interface';
import { TransactionsVolumeComponent } from '@crt/shared/components/transactions-volume/transactions-volume.component';
import { Router, RouterModule } from '@angular/router';

const VOLUME_STORAGE_KEY = 'volume';

@Component({
  selector: 'crt-transactions',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterModule,
    DestroyDirective,
    MatProgressSpinnerModule,
    TransactionsGroupsListComponent,
    TransactionsTableComponent,
    TransactionsVolumeComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent extends DestroyDirective implements OnInit {
  readonly transactionsApiService = inject(TransactionsApiService);
  readonly localStorageService = inject(LocalStorageService);
  readonly toastrService = inject(ToastrService);
  readonly router = inject(Router);

  transactionsGroups: ISwapTransactionsGroup[] = [];
  transactions: ISwapTransaction[] = [];

  readonly isLoading$ = new BehaviorSubject<boolean>(false);

  selectedVolume =
    this.localStorageService.getItem<number>(VOLUME_STORAGE_KEY) || 10000;

  ngOnInit(): void {
    this.getTransactionsList();
  }

  onVolumeChange(volume: number): void {
    this.selectedVolume = volume;
    this.getTransactionsList();
  }

  getTransactionsList(): void {
    this.isLoading$.next(true);
    this.transactionsApiService
      .getTransactions({
        historical_usd__gte: this.selectedVolume,
        limit: 150,
      })
      .pipe(
        tap((transactions) => {
          this.transactions = transactions;
        }),
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  onSelectRow(id: number): void {
    this.router.navigate(['/user-info', id]);
  }
}
