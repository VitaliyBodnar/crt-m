import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISwapTransaction } from '../../interfaces/swap-transaction.interface';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { TransactionsTokenNamePipe } from '../../pipes/transactions-token-name.pipe';
import { NumberFormatterPipe } from 'src/app/core/directives/numbers-formatter.pipe';
import { MathAbsPipe } from 'src/app/core/directives/price.pipe';

@Component({
  selector: 'crt-transactions-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    NumberFormatterPipe,
    TransactionsTokenNamePipe,
    MathAbsPipe,
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent {
  @Input({ required: true }) transactions!: ISwapTransaction[];

  readonly displayedColumns: string[] = ['amount', 'from', 'to'];
}
