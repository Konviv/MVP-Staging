import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TellonePage } from './tellone';

@NgModule({
  declarations: [
    TellonePage,
  ],
  imports: [
    IonicPageModule.forChild(TellonePage),
  ],
})
export class TellonePageModule {}
