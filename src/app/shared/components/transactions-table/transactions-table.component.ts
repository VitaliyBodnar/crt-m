import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ISwapTransaction } from '../../../pages/transactions/interfaces/swap-transaction.interface';
import { MatTableModule } from '@angular/material/table';
import { NumberFormatterPipe } from '@crt/core/pipes/numbers-formatter.pipe';
import { TransactionsTokenNamePipe } from '../../../pages/transactions/pipes/transactions-token-name.pipe';
import { MathAbsPipe } from '@crt/core/pipes/price.pipe';
import { RoundPipe } from '@crt/core/pipes/round.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'crt-transactions-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    NumberFormatterPipe,
    TransactionsTokenNamePipe,
    MathAbsPipe,
    RoundPipe,
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent {
  @Input({ required: true }) transactions: ISwapTransaction[];
  @Input() isLoading = false;

  @Output() readonly selectRow = new EventEmitter<number>();

  readonly displayedColumns: string[] = ['amount', 'from', 'to'];

  preventClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
