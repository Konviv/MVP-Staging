import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllInsightsPage } from './all-insights';

@NgModule({
  declarations: [
    AllInsightsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllInsightsPage),
  ],
})
export class AllInsightsPageModule {}
