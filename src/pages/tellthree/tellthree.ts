import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TellfourPage } from '../tellfour/tellfour';

/**
 * Generated class for the TellthreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tellthree',
  templateUrl: 'tellthree.html',
})
export class TellthreePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  whatIsNext() {
    this.navCtrl.push('TellfourPage');
  }

}
