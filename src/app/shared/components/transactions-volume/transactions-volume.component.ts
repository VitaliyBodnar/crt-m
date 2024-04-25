import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VOLUME_STORAGE_KEY } from '@crt/core/constants/local-storage-keys.const';
import { IDropdownOption } from '@crt/core/interfaces/dropdown-option.interface';
import { LocalStorageService } from '@crt/core/services/local-storage.service';

@Component({
  selector: 'crt-transactions-volume',
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './transactions-volume.component.html',
  styleUrl: './transactions-volume.component.scss',
})
export class TransactionsVolumeComponent {
  @Output() volumeChange = new EventEmitter<number>();

  readonly localStorageService = inject(LocalStorageService);

  readonly volumeOptions: IDropdownOption<number>[] = [
    { value: 1000, viewValue: '1000' },
    { value: 10000, viewValue: '10 000' },
    { value: 100000, viewValue: '100 000' },
    { value: 1000000, viewValue: '1 000 000' },
  ];

  selectedVolume =
    this.localStorageService.getItem<number>(VOLUME_STORAGE_KEY) || 10000;

  onVolumeChange(): void {
    this.localStorageService.setItem(VOLUME_STORAGE_KEY, this.selectedVolume);
    this.volumeChange.emit(this.selectedVolume);
  }
}
