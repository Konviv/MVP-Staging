import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountTransactionsPage } from './account-transactions';

@NgModule({
  declarations: [
    AccountTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountTransactionsPage),
  ],
})
export class AccountTransactionsPageModule {}
