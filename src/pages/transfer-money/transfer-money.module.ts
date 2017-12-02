import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferMoneyPage } from './transfer-money';

@NgModule({
  declarations: [
    TransferMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferMoneyPage),
  ],
})
export class TransferMoneyPageModule {}
