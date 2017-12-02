import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistertwoPage } from '../registertwo/registertwo';

/**
 * Generated class for the RegisterOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-one',
  templateUrl: 'register-one.html',
})
export class RegisterOnePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  learnMore() {
    this.navCtrl.push('RegistertwoPage');
  }

}
