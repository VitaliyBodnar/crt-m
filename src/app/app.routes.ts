import { Routes } from '@angular/router';
import { TRANSACTIONS_DETAILS_ROUTES } from './pages/transactions/transactions.routes';
import { USER_INFO_ROUTES } from './pages/user-info/user-info.routes';

export const routes: Routes = [
  ...TRANSACTIONS_DETAILS_ROUTES,
  ...USER_INFO_ROUTES,
];
