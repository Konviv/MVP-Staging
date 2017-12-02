import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TellthreePage } from '../tellthree/tellthree';

/**
 * Generated class for the TelltwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-telltwo',
  templateUrl: 'telltwo.html',
})
export class TelltwoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  learnAboutBuckets() {
    this.navCtrl.push('TellthreePage');
  }

}
