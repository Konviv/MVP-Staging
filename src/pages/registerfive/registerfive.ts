import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the RegisterfivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerfive',
  templateUrl: 'registerfive.html',
})
export class RegisterfivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  signUp() {
    this.navCtrl.push('RegisterPage');
  }

}
