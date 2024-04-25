import { Component } from '@angular/core';

@Component({
  selector: 'crt-tokens-table',
  templateUrl: './tokens-table.component.html',
  styleUrl: './tokens-table.component.scss',
  standalone: true,
  imports: [],
})
export class TokensTableComponent {
  displayedColumns: string[] = ['position'];
}
