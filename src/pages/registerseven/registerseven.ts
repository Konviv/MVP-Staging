import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the RegistersevenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerseven',
  templateUrl: 'registerseven.html',
})
export class RegistersevenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToHome() {
    this.navCtrl.setRoot('MenuPage');
  }

}
