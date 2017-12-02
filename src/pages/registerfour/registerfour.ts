import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterfivePage } from '../registerfive/registerfive';

/**
 * Generated class for the RegisterfourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerfour',
  templateUrl: 'registerfour.html',
})
export class RegisterfourPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  moneyIsSafe() {
    this.navCtrl.push('RegisterfivePage');
  }

}
