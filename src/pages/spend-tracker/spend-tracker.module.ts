import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpendTrackerPage } from './spend-tracker';

@NgModule({
  declarations: [
    SpendTrackerPage,
  ],
  imports: [
    IonicPageModule.forChild(SpendTrackerPage),
  ],
})
export class SpendTrackerPageModule {}
