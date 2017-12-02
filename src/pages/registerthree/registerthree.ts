import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterfourPage } from '../registerfour/registerfour';

/**
 * Generated class for the RegisterthreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerthree',
  templateUrl: 'registerthree.html',
})
export class RegisterthreePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showMoney() {
    this.navCtrl.push('RegisterfourPage');
  }

}
