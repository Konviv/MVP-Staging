import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TelltwoPage } from '../telltwo/telltwo';
/**
 * Generated class for the TellonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tellone',
  templateUrl: 'tellone.html',
})
export class TellonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  learnAboutBuckets() {
    this.navCtrl.push('TelltwoPage');
  }

}
