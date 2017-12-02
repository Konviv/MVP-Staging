import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterOnePage } from './register-one';

@NgModule({
  declarations: [
    RegisterOnePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterOnePage),
  ],
})
export class RegisterOnePageModule {}
