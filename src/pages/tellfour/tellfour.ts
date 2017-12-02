import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the TellfourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tellfour',
  templateUrl: 'tellfour.html',
})
export class TellfourPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  whatIsNext() {
    this.navCtrl.push('RegisterPage');
  }
}
