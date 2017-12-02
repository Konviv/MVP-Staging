import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavingsBucketPage } from './savings-bucket';

@NgModule({
  declarations: [
    SavingsBucketPage,
  ],
  imports: [
    IonicPageModule.forChild(SavingsBucketPage),
  ],
})
export class SavingsBucketPageModule {}
