import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NumberFormatterPipe } from '../../core/directives/numbers-formatter.pipe';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  finalize,
  map,
  of,
  takeUntil,
  tap,
  forkJoin,
} from 'rxjs';

import { TransactionsApiService } from './services/transactions-api.service';
import { DestroyDirective } from '../../core/directives/destroy.directive';
import { FixedPipe } from '../../core/directives/fixed.directive';
import { CryptoCurrencyPipe } from '../../core/directives/currency.pipe';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { IDropdownOption } from '../../core/interfaces/dropdown-option.interface';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import Swiper from 'swiper';

import { HttpErrorResponse } from '@angular/common/http';
import { TransactionsTokenNamePipe } from './pipes/transactions-token-name.pipe';
import { TransactionsGroupsListComponent } from './components/transactions-groups-list/transactions-groups-list.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { ISwapTransaction } from './interfaces/swap-transaction.interface';
import { ISwapTransactionsGroup } from './interfaces/swap-transations-group.interface';

const VOLUME_STORAGE_KEY = 'volume';

@Component({
  selector: 'crt-transactions',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    DestroyDirective,
    MatProgressSpinnerModule,
    TransactionsGroupsListComponent,
    TransactionsTableComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent extends DestroyDirective implements OnInit {
  readonly transactionsApiService = inject(TransactionsApiService);
  readonly localStorageService = inject(LocalStorageService);
  readonly toastrService = inject(ToastrService);

  transactionsGroups: ISwapTransactionsGroup[] = [];
  transactions: ISwapTransaction[] = [];

  readonly isLoading$ = new BehaviorSubject<boolean>(false);

  readonly volumeOptions: IDropdownOption<number>[] = [
    { value: 1000, viewValue: '1000' },
    { value: 10000, viewValue: '10 000' },
    { value: 100000, viewValue: '100 000' },
    { value: 1000000, viewValue: '1 000 000' },
    { value: 1000000000, viewValue: '1 000 000 000' },
  ];

  selectedVolume =
    this.localStorageService.getItem<number>(VOLUME_STORAGE_KEY) || 1000000;

  ngOnInit(): void {
    this.getTransactionsList();
  }

  onVolumeChange(): void {
    this.localStorageService.setItem(VOLUME_STORAGE_KEY, this.selectedVolume);
    this.getTransactionsList();
  }

  getTransactionsList(): void {
    this.isLoading$.next(true);
    forkJoin([
      this.transactionsApiService.getTransactions(this.selectedVolume),
      // this.transactionsApiService.getTransactionsGroup(this.selectedVolume),
    ])
      .pipe(
        tap(([transactions]) => {
          this.transactions = transactions;
          // this.transactionsGroups = groups;
          this.initSwiper();
        }),
        catchError((error: HttpErrorResponse) => {
          this.toastrService.error(error.message);

          return of(error);
        }),
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  private initSwiper(): void {
    const swiper = new Swiper('.mySwiper', {
      modules: [],
      spaceBetween: 40,
    });
  }
}
