import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NumberFormatterPipe } from '@crt/core/pipes/numbers-formatter.pipe';
import { ISwapTransactionsGroup } from '../../../pages/transactions/interfaces/swap-transations-group.interface';

@Component({
  selector: 'crt-transactions-groups-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatExpansionModule, NumberFormatterPipe],
  templateUrl: './transactions-groups-list.component.html',
  styleUrl: './transactions-groups-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsGroupsListComponent {
  @Input({ required: true }) transactionsGroups: ISwapTransactionsGroup[];
}
