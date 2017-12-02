import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsightsPage } from './insights';

@NgModule({
  declarations: [
    InsightsPage,
  ],
  imports: [
    IonicPageModule.forChild(InsightsPage),
  ],
})
export class InsightsPageModule {}
