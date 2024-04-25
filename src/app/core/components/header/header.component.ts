import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'crt-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class HeaderComponent {}
