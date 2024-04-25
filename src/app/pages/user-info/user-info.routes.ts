import { Routes } from '@angular/router';
import { TransactionsComponent } from '../transactions/transactions.component';
import { UserInfoComponent } from './user-info.component';

export const USER_INFO_ROUTES: Routes = [
  {
    path: 'user-info/:id',
    component: UserInfoComponent,
  },
];
