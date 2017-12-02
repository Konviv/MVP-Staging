import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TellthreePage } from './tellthree';

@NgModule({
  declarations: [
    TellthreePage,
  ],
  imports: [
    IonicPageModule.forChild(TellthreePage),
  ],
})
export class TellthreePageModule {}
