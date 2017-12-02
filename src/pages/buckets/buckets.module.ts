import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BucketsPage } from './buckets';

@NgModule({
  declarations: [
    BucketsPage,
  ],
  imports: [
    IonicPageModule.forChild(BucketsPage),
  ],
})
export class BucketsPageModule {}
